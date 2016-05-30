module goodidea {
    export class UserProjectList {
        /**
         * 擁有的提案列表
         */
        public own: Project[] = [];

        /**
         * 參與的提案列表
         */
        public participate: Project[] = [];

        /**
         * 由JSON資料產生UserProjectList
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): UserProjectList {
            var result = new UserProjectList();
            
            for (var i = 0; i < data['Own'].length; i++) {
                result.own.push(Project.loadFromJSON(data['Own'][i]));
            }
            for (var i = 0; i < data['Participate'].length; i++) {
                result.participate.push(Project.loadFromJSON(data['Participate'][i]));
            }

            return result;
        }
    }
}