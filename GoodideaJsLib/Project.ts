module goodidea {
    export enum OrderBy{
        
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
        public files:DocumentInfo;
        
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

        public static loadFromJSON(data: JSON): Project {
            var result = new Project();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[firstToLowerCase(fields[i])] = data[fields[i]];
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
        
        public static async getProjectList(_class:Class,competition:Competition,orderby:OrderBy):Promise<ProjectResultPage>{
            return Project.search(null,_class,competition,orderby);
        }
        
        public static async search(keyword:string,_class:Class,competition:Competition,orderby:OrderBy):Promise<ProjectResultPage>{
            return null;
        }
    }
}