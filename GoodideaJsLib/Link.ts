module goodidea {
    export class Link {
        /*
         * 相關連結Id
         */
        public id: string;

        /*
         * 相關連結名稱
         */
        public name: string;

        /*
         * 相關連結位址
         */
        public url: string;

        /**
         * 由JSON資料產生Link
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): Link {
            var result = new Link();
            result.id = data['Id'];
            result.name = data['Name'];
            result.url = data['Url'];
            return result;
        }

        /**
         * 取得相關連結列表
         */
        public static async getLinkList(): Promise<Link[]> {
            var responseJSON = await postAsync('api/link/list');
            var result = [];
            for (var i = 0; i < responseJSON['Result'].length; i++) {
                result.push(Link.loadFromJSON(responseJSON['Result'][i]));
            }
            return result;
        }
    }
}