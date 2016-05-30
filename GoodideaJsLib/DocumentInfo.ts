module goodidea {
    export class DocumentInfo {
        /**
         * 提案文件Id
         */
        public id: string;

        /**
         * 提案文件名稱
         */
        public name: string;

        /**
         * 提案文件檔案資訊
         */
        public file:FileInfo;

        /**
         * 由JSON資料產生DocumentInfo
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): DocumentInfo{
            var result = new DocumentInfo();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[fields[i].toLowerCase()] = data[fields[i]];
            }
            result.file = FileInfo.loadFromJSON(data['File']);
            return result;
        }
    }
}