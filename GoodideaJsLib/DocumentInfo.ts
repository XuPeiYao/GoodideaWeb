module goodidea {
    export class DocumentInfo {
        /**
         * ���פ��Id
         */
        public id: string;

        /**
         * ���פ��W��
         */
        public name: string;

        /**
         * ���פ���ɮ׸�T
         */
        public file:FileInfo;

        /**
         * ��JSON��Ʋ���DocumentInfo
         * @param data ��ƨӷ�
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