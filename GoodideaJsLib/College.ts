module goodidea {
    export class College {
        /**
         * 學院Id
         */
        public id: string;

        /**
         * 學院名稱
         */
        public name: string;

        /**
         * 由JSON資料產生College
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): College {
            var result = new College();
            result.id = data['Id'];
            result.name = data['Name'];
            return result;
        }
    }
}