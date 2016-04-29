module goodidea {
    export class Banner {
        public id: string;
        public url: string;

        public static loadFromJSON(data: JSON): Banner {
            var result = new Link();
            result.id = data['Id'];
            result.url = data['Url'];
            return result;
        }

        public static async getBannerList(): Promise<Banner[]> {
            var responseJSON = await postAsync('api/banner/list');
            var result = [];
            for (var i = 0; i < responseJSON['Result'].length; i++) {
                result.push(Banner.loadFromJSON(responseJSON['Result'][i]));
            }
            return result;
        }
    }
}