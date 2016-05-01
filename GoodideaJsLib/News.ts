module goodidea {
    export class News {
        public id: string;
        public title: string;
        public timeString: any;
        public time: Date;
        public views: number;
        public content: string;
        public files: FileInfo[];
        public static loadFromJSON(data: JSON): News {
            var result = new News();
            result.id = data['Id'];
            result.title = data['Title'];
            result.views = data['Views'];
            result.timeString = data['Time'];
            if (!result.timeString['substring']) {
                result.time = new Date(result.timeString);
            }

            if (data['Content']) result.content = data['Content'];
            if (data['Files']) {
                result.files = [];
                for (var i = 0; i < data['Files'].length; i++) {
                    result.files.push(FileInfo.loadFromJSON(data['Files'][i]));
                }
            }

            return result;
        }

        public static async getNewsList(): Promise<Class[]> {
            var result = [];
            var responseJSON = await postAsync('api/class/list');

            for (var i = 0; i < responseJSON['Result'].length; i++) {
                result.push(Class.loadFromJSON(responseJSON['Result'][i]));
            }

            return result;
        }
    }
}