module goodidea {
    export class News {
        public id: string;
        public title: string;
        public timeString: any;
        public time: Date;
        public views: number;
        public content: string;
        public files: DocumentInfo[];

        public static async getNewsById(id:string) : Promise<News> {
            var responseJSON = await postAsync('api/news/get', null, {
                news: id
            });
            return News.loadFromJSON(responseJSON['Result']);
        }

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
                    result.files.push(DocumentInfo.loadFromJSON(data['Files'][i]));
                }
            }

            return result;
        }

        public static async getNewsList(): Promise<PageResult<News>> {
            var result = new PageResult<News>(goodidea.News);
            result.length = 5;
            result.url = 'api/news/list';
            await result.load();

            
            return result;
        }
    }
}