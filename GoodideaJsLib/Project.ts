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
         * 取得提案內容
         */
        public awards:string;
        
        /**
         * 取得提案夾帶的檔案
         */
        public files:DocumentInfo[] = [];
        
        /**
         * 取得提案成員徵人需求
         */
        public memberRequest:any;
        
        /**
         * 取得標籤(由系統管理員設定)
         */
        public hashTag:KeyValue;
        
        /**
         * 取得提案參與的競賽
         */
        public competition:Competition;
        
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
        public lastEditDate:string;
        
        /**
         * 取得提案團隊資訊
         */
        public team:Team;
        
        /**
         * 取得提案摘要
         */
        public summary:string;
        
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
         * 更新提案內容
         */
        public async update():Promise<void>{
            return null;
        }

        public async addMember(user: (string | User), isTeacher: boolean, isAssistant: boolean): Promise<TeamMember> {
            var id = user['id'] || user;
            var responseJSON = await postAsync('api/project/addmember', null, { project: this.id, user: id, isTeacher: isTeacher, isAssistant: isAssistant });
            var member = TeamMember.loadFromJSON(responseJSON['Result']);
            this.team.group.push(member);
            return member;
        }

        public async removeMember(member: (string | TeamMember | User)): Promise<void>{
            var id = member['user']['id'] || member['id'] || member;
            var responseJSON = await postAsync('api/project/removemember', null, { project: this.id, user: id });
            this.team.group = this.team.group.filter(x => x.user.id != id);
        }

        public async uploadFile(name:string,file: File): Promise<DocumentInfo> {
            var responseJSON = await postAsync('api/project/addfile', null, { project: this.id, file: file,name:name });
            var result = DocumentInfo.loadFromJSON(responseJSON['Result']);
            this.files.push(DocumentInfo.loadFromJSON(responseJSON['Result']));
            return result;
        }

        public async deleteFile(doc: (string | DocumentInfo)): Promise<void> {
            var id = doc['id'] || doc;
            var responseJSON = await postAsync('api/project/removefile', null, { file: id });
            this.files = this.files.filter(x => x.id != id);
        }

        public async uploadCover(file: File): Promise<FileInfo> {
            var responseJSON = await postAsync('api/project/update', null, { project: this.id, cover: file });
            var result = FileInfo.loadFromJSON(responseJSON['Result']);
            this.cover = result;
            return result;
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
            for (var i = 0; i < data['Files'].length; i++) {
                result.files.push(DocumentInfo.loadFromJSON(data['Files'][i]));
            }
            if (data['Team']) {
                result.team = Team.loadFromJSON(data['Team']);
            }
            return result;
        }
        
        public static async getUserProjects(user: (User | string)): Promise<UserProjectList>{
            var id = user['id'] || user;
            var responseJSON = await postAsync('api/project/userlist', null, { id: id });
            return UserProjectList.loadFromJSON(responseJSON['Result']);
        }

        public static async getProjectById(id: string): Promise<Project> {
            var responseJSON = await postAsync('api/project/get', null, { project: id });
            return Project.loadFromJSON(responseJSON['Result']);
        }
        
        public static async getLoginUserProjects():Promise<UserProjectList> {
            return Project.getUserProjects("me");
        }
        
        public static async getProjectList(_class:Class,competition:Competition,order:OrderBy):Promise<ProjectResultPage>{
            return Project.search(null,_class,competition,order);
        }
        
        public static async search(keyword: string, _class: Class, competition: Competition, order: OrderBy): Promise<ProjectResultPage>{
            var  api = 'api/project/list';
            var data = {
                length: 10,
                class: _class ? _class.id : 'N',
                competition: competition ? competition.id : 'N',
                order: OrderBy[order]
            };
            if (keyword != null) {
                api = 'api/project/search';
                data['q'] = keyword;
            }

            var responseJSON = await postAsync(api, null, data);

            var result = ProjectResultPage.loadFromJSON(responseJSON);
            result.url = api;
            result.index = 0;
            result.length = 10;
            result.competition = competition;
            result.class = _class;
            result.keyword = keyword;
            result.order = order;

            return result;
        }
    }
}