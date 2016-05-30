module goodidea {
    export class MemberRequestSpecialty {
        /*
         * 成員需求專長Id
         */
        public id: string;

        /*
         * 成員需求專長內容
         */
        public value: string;

        /**
         * 由JSON資料產生MemberRequestSpecialty
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): MemberRequestSpecialty {
            var result = new MemberRequestSpecialty();
            result.id = data['Id'];
            result.value = data['Value'];
            return result;
        }
    }
}