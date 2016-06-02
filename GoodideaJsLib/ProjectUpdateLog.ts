module goodidea {
    export class ProjectUpdateLog {
        /**
         * 更新紀錄Id
         */
        public id: string;

        /**
         * 更新使用者
         */
        public user: User;

        /**
         * 更新後的資料
         */
        public content: string;

        /**
         * 更新時間
         */
        public time: Date;

        /**
         * 更新的提案Id
         */
        public projectId: string;

        /**
         * 取得提案
         */
        public async getProject(): Promise<Project> {
            return Project.getProjectById(this.projectId);
        }

        /**
         * 取得指定提案更新紀錄分頁列表
         * @param project 提案
         */
        public static async getUpdateLogs(project: Project | string): Promise<PageResult<ProjectUpdateLog>> {
            var result = new PageResult<ProjectUpdateLog>(ProjectUpdateLog);
            result.url = 'api/project/updateLogs';
            result.params = {
                project: project['id'] || project
            };
            result.length = 10;
            await result.load();
            return result;
        }

        /**
         * 使用Id取得指定提案更新紀錄
         * @param Id 
         */
        public static async getUpdateLogById(project:Project | string,id: string):Promise<ProjectUpdateLog> {
            var data = await postAsync('api/project/GetUpdateLog', null, {
                project: project['id'] || project,
                log: id
            });
            return ProjectUpdateLog.loadFromJSON(data['Result']);
        }

        /**
         * 由JSON資料產生ProjectUpdateLog
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): ProjectUpdateLog {
            var result = new ProjectUpdateLog();
            result.id = data['Id'];
            result.user = User.loadFromJSON(data['User']);
            result.content = data['Content'];
            result.time = new Date(data['Time']);
            result.projectId = data['ProjectId'];
            return result;
        }
    }
}