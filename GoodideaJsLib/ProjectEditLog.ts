module goodidea {
    export class ProjectEditLog {
        public id: string;
        public projectId: string;
        public user: User;
        public userId: string;
        public content: string;

        public static loadFromJSON(data: JSON): ProjectEditLog {
            var result = new ProjectEditLog();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }

            return result;
        }

        public async getProject(): Promise<Project> {
            return Project.getProjectById(this.projectId);
        }

        public static async getEditLogs(project: Project|string): Promise<PageResult<ProjectEditLog>> {
            var result = new PageResult<ProjectEditLog>(ProjectEditLog);
            result.url = 'api/project/updateLogs';
            result.params = {
                project: project['id'] || project
            };
            result.length = 10;
            await result.load();
            return result;
        }
    }
}