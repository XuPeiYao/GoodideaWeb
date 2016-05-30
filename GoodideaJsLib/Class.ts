module goodidea {
    export class Class {
        /**
         * 分類Id
         */
        public id: string;

        /**
         * 分類名稱
         */
        public name: string;

        /**
         * 由JSON資料產生Class
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): Class {
            var result = new Class();
            result.id = data['Id'];
            result.name = data['Name'];

            return result;
        }

        /**
         * 取得分類列表
         */
        public static async getClassList(): Promise<Class[]> {
            var result = [];
            var responseJSON = await postAsync('api/class/list');

            for (var i = 0; i < responseJSON['Result'].length; i++) {
                result.push(Class.loadFromJSON(responseJSON['Result'][i]));
            }

            return result;
        }
    }
}