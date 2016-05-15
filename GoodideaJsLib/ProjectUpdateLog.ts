module goodidea {
    export class ProjectUpdateLog {
        public id: string;
        public user: User;
        public content: string;
        public time: Date;

        public static loadFromJSON(data: JSON): ProjectUpdateLog {
            var result = new ProjectUpdateLog();
            result.id = data['Id'];
            result.user = User.loadFromJSON(data['User']);
            result.content = data['Content'];
            result.time = new Date(data['Time']);

            return result;
        }
    }
}