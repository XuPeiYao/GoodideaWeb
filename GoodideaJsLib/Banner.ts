module goodidea {
    export class Banner {
        /**
         * BannerId
         */
        public id: string;

        /**
         * 圖片位址
         */
        public url: string;

        /**
         * 由JSON資料產生Banner
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): Banner {
            var result = new Banner();
            result.id = data['Id'];
            result.url = data['Url'];
            return result;
        }

        /**
         * 取得Banner列表
         */
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