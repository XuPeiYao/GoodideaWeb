module goodidea {
    export class Team {
        /**
         * 團隊名稱
         */
        public name: string;

        /**
         * 團隊成員資訊
         */
        public group: TeamMember[] = [];

        /**
         * 由JSON資料產生Team
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): Team {
            var result = new Team();
            result.name = data['Name'];
            result.group = [];

            for (var i = 0; i < data['Group'].length; i++) {
                result.group.push(TeamMember.loadFromJSON(data['Group'][i]));
            }

            return result;
        }
    }
}