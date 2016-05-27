module goodidea {
    export enum OrderBy{
        lastEditTime,name,class,views,votes,awardsFirst
    }
   
    export class Project {
        /**
         * 取得提案Id
         */
        public id:string;
        
        /**
         * 取得或設定提案名稱
         */
        public name:string;
        
        /**
         * 取得或設定提案內容
         */
        public content:string;
        
        /**
         * 取得提案得票數
         */
        public votes:number;
        
        /**
         * 取得提案瀏覽人次
         */
        public views:number;
        
        /**
         * 取得或設定提案是否公開
         */
        public isPublish:boolean;
        
        /**
         * 取得提案獎項
         */
        public awards:string;
        
        /**
         * 取得提案夾帶的檔案
         */
        public files:DocumentInfo[] = [];
        
        /**
         * 取得提案成員徵人需求
         */
        public memberRequest: MemberRequest[];
        
        /**
         * 取得標籤(由系統管理員設定)
         */
        public hashTag:KeyValue;
        
        /**
         * 取得提案參與的競賽
         */
        public competition:Competition;

        /**
         * 取得參賽編號
         */
        public competitionPId: string;

        /**
         * 取得或設定提案分類
         */
        public class:Class;
        
        /**
         * 取得提案封面圖檔
         */
        public cover:FileInfo;
        
        /**
         * 取得提案擁有者資訊
         */
        public owner:User;
        
        /**
         * 取得提案最後編輯時間
         */
        public lastEditTime:Date;
        
        /**
         * 取得提案團隊資訊
         */
        public team:Team;
        
        /**
         * 取得提案摘要
         */
        public summary:string;

        /**
         * 是否可編輯
         */
        public editable: boolean;

        /**
         * 是否可進行設定
         */
        public setable: boolean;

        /**
         * 讀取提案內容
         */
        public async load():Promise<void>{
            var temp = await Project.getProjectById(this.id);
            var fields =  temp.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (temp[fields[i]] instanceof Function) continue;
                this[fields[i]] = temp[fields[i]];
            }
        }

        /**
         * 取得提案Markdown的章節剖析物件
         */
        public getContentSegments(): MarkdownSegment {
            return new MarkdownSegment(this.content);
        }
        
        /**
         * 更新提案
         */
        public async update(): Promise<void>{
            await postAsync('api/project/update', null, {
                project: this.id,
                name: this.name,
                class: this.class.id,
                content: this.content,
                isPublish: this.isPublish,
                teamName: this.team.name
            });
        }

        /**
         * 更新提案內容
         */
        public async updateContent(): Promise<void> {
            await postAsync('api/project/update', null, {
                project: this.id,
                content: this.content
            });
        }

        //#region 細部更新操作
        /**
         * 更新提案隊伍名稱
         */
        public async updateTeamName(): Promise<void> {
            await postAsync('api/project/update', null, {
                project: this.id,
                teamName: this.team.name
            });
        }

        /**
         * 更新提案名稱
         */
        public async updateName(): Promise<void> {
            await postAsync('api/project/update', null, {
                project: this.id,
                name: this.name
            });
        }

        /**
         * 更新提案類別
         */
        public async updateClass(): Promise<void> {
            await postAsync('api/project/update', null, {
                project: this.id,
                class: this.class.id
            });
        }

        /**
         * 更新提案公開狀態
         */
        public async updatePublish(): Promise<void> {
            await postAsync('api/project/update', null, {
                project: this.id,
                isPublish: this.isPublish
            });
        }
        //#endregion

        /**
         * 加入新的團隊成員
         * @param user 團隊成員的ID或User物件
         * @param memberType 團隊成員類型
         */
        public async addMember(user: (string | User), memberType : MemberType ): Promise<TeamMember> {
            var id = user['id'] || user;//isTeacher: boolean, isAssistant: boolean
            //memberType = memberType || MemberType.member;
            var data = {
                project: this.id,
                user: id,
                isTeacher: memberType != MemberType.member,
                isAssistant: memberType == MemberType.assistant
            };
            var responseJSON = await postAsync('api/project/addmember', null, data);
            var member = TeamMember.loadFromJSON(responseJSON['Result']);
            this.team.group.push(member);
            return member;
        }

        /**
         * 剔除團隊成員
         * @param member 團隊成員的ID或TeamMember、User物件
         */
        public async removeMember(member: (string | TeamMember | User)): Promise<void>{
            var id = member['user']['id'] || member['id'] || member;
            var responseJSON = await postAsync('api/project/removemember', null, { project: this.id, user: id });
            this.team.group = this.team.group.filter(x => x.user.id != id);
        }

        /**
         * 加入新的團隊成員需求
         * @param isTeacher 是否為指導教授
         * @param specialty 專長需求集合
         */
        public async addMemberRequest(isTeacher: boolean, specialty: string[]): Promise<MemberRequest> {
            var responseJSON = specialty ? await postAsync('api/project/addMemberRequest', null, {
                project: this.id,
                isTeacher: isTeacher,
                specialty: specialty.join(",")
            }) : await postAsync('api/project/addMemberRequest', null, {
                project: this.id,
                isTeacher: isTeacher
            });
            var result = MemberRequest.loadFromJSON(responseJSON['Result']);
            if (!this.memberRequest) this.memberRequest = [];
            this.memberRequest.push(result);
            return result;
        }

        public async removeMemberRequest(memberRequest: string | MemberRequest): Promise<void> {
            var id = memberRequest['id'] || memberRequest;
            await postAsync('api/project/removeMemberRequest', null, {
                request: id
            });
            if (!this.memberRequest) return;
            this.memberRequest = this.memberRequest.filter(x => x.id != id);
        }



        /**
         * 上傳相關文件
         * @param name 檔案名稱
         * @param file 檔案
         */
        public async uploadFile(name:string,file: File): Promise<DocumentInfo> {
            var responseJSON = await postAsync('api/project/addfile', null, { project: this.id, file: file,name:name });
            var result = DocumentInfo.loadFromJSON(responseJSON['Result']);
            this.files.push(DocumentInfo.loadFromJSON(responseJSON['Result']));
            return result;
        }

        /**
         * 刪除相關文件
         * @param doc 檔案ID或DocumentInfo物件
         */
        public async deleteFile(doc: (string | DocumentInfo)): Promise<void> {
            var id = doc['id'] || doc;
            var responseJSON = await postAsync('api/project/removefile', null, { file: id });
            this.files = this.files.filter(x => x.id != id);
        }

        /**
         * 上傳封面
         * @param file 封面檔案
         */
        public async uploadCover(file: File): Promise<FileInfo> {
            var responseJSON = await postAsync('api/project/update', null, { project: this.id, cover: file });
            var result = FileInfo.loadFromJSON(responseJSON['Result']['Cover']);
            this.cover = result;
            return result;
        }

        /**
         * 參加指定競賽
         * @param competition 指定競賽的ID或Competition物件
         */
        public async joinCompetition(competition: Competition | string) : Promise<void>{
            await postAsync('api/project/joinCompetition', null, {
                project: this.id,
                competition: competition
            });
            this.load();//reload Project
        }

        /**
         * 投票並回傳剩餘票數
         */
        public async vote(): Promise<number> {
            var responseJSON =await postAsync('api/project/vote', null, {
                project: this.id
            });
            return responseJSON['Result']['Quota'];
        }

        /**
         * 複製目前提案
         * @param name 新的提案名稱
         */
        public async clone(name?: string): Promise<Project> {
            var data = { project: this.id };
            if (name) data['name'] = name;
            var responseJSON = await postAsync('api/project/clone', null, data);
            return Project.loadFromJSON(responseJSON['Result']);
        }

        /**
         * 刪除目前專案
         */
        public async delete(): Promise<void> {
            await postAsync('api/project/delete', null, { project: this.id });
        }

        /**
         * 取得目前提案的編輯紀錄
         */
        public async getProjectUpdateLogList(): Promise<PageResult<ProjectUpdateLog>> {
            var result = new PageResult<ProjectUpdateLog>(goodidea.ProjectUpdateLog);
            result.url = 'api/project/requestList';
            result.params = {
                project: this.id
            };
            result.length = 10;
            await result.load();
            return result;
        }

        /**
         * 新增提案
         * @param name 提案名稱
         * @param _class 提案分類ID或Class物件
         * @param temp 提案競賽樣板，競賽ID或Competition物件
         */
        public static async create(name: string, _class: (Class | string), temp: (Competition | string)): Promise<Project> {
            var data = {
                name: name,
                class: _class['id'] || _class
            };
            if (temp) data['competition'] = temp['id'] || temp;
            var responseJSON = await postAsync('api/project/add', null, data);
            return Project.loadFromJSON(responseJSON['Result']);
        }

        public static loadFromJSON(data: JSON): Project {
            var result = new Project();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }

            result.owner = User.loadFromJSON(data['Owner']);
            result.files = [];
            if (data['Files']) {
                for (var i = 0; i < data['Files'].length; i++) {
                    result.files.push(DocumentInfo.loadFromJSON(data['Files'][i]));
                }
            }
            if (data['MemberRequest']) {
                result.memberRequest = [];
                for (var i = 0; i < data['MemberRequest'].length; i++) {
                    result.memberRequest.push(MemberRequest.loadFromJSON(data['MemberRequest'][i]));
                }
            }
            if (data['Class']) {
                result.class = Class.loadFromJSON(data['Class']);
            }
            if (data['Competition']) {
                result.competition = goodidea.Competition.loadFromJSON(data['Competition']);
            }
            if (data['Cover']) {
                result.cover = FileInfo.loadFromJSON(data['Cover']);
            }
            if (data['LastEditTime']) {
                result.lastEditTime = new Date(data['LastEditTime']);
            }
            if (data['Team']) {
                result.team = Team.loadFromJSON(data['Team']);                
            }
            return result;
        }

        /**
         * 取得指定使用者ID或User物件對象所有提案
         * @param user 指定使用者
         */
        public static async getUserProjects(user: (User | string)): Promise<UserProjectList>{
            var id = user['id'] || user;
            var responseJSON = await postAsync('api/project/userlist', null, { id: id });
            return UserProjectList.loadFromJSON(responseJSON['Result']);
        }

        /**
         * 取得指定使用者所有提案
         * @param id 指定使用者ID
         */
        public static async getProjectById(id: string): Promise<Project> {
            var responseJSON = await postAsync('api/project/get', null, { project: id });
            return Project.loadFromJSON(responseJSON['Result']);
        }

        /**
         * 取得目前登入使用者的所有提案
         */
        public static async getLoginUserProjects():Promise<UserProjectList> {
            return Project.getUserProjects("me");
        }
        
        /**
         * 取得目前系統中公開提案清單
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        public static async getProjectList(_class: Class, competition: Competition, order: OrderBy): Promise<PageResult<Project>>{
            return Project.search(null,_class,competition,order);
        }

        /**
         * 取得目前系統中有徵人公開提案清單
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        public static async getRequestProjectList(keyword:string,_class: Class, order: OrderBy): Promise<PageResult<Project>> {
            var result = new PageResult<Project>(goodidea.Project);
            result.url = 'api/project/requestList';
            result.params = {
                q:keyword,
                class: _class ? (_class.id || _class) : 'N',
                order: OrderBy[order]
            };
            result.length = 10;
            await result.load();
            return result;
        }
        
        /**
         * 搜尋目前系統中公開提案
         * @param keyword 關鍵字
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        public static async search(keyword: string, _class: Class, competition: Competition, order: OrderBy): Promise<PageResult<Project>>{
            var result = new PageResult<Project>(goodidea.Project);
            result.url = 'api/project/list';
            result.params = {
                class: _class ? (_class.id || _class) : 'N',
                competition: competition ? (competition.id || competition) : 'N',
                order: OrderBy[order]
            };
            if (keyword != null) {
                result.url = 'api/project/search';
                result.params['q'] = keyword;
            }
            result.length = 10;
            await result.load();
            return result;
        }
    }
}