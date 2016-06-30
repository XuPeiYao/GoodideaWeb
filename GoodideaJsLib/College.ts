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
         * 系所集合
         */
        public departments: Department[];

        /**
         * 由JSON資料產生College
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): College {
            var result = new College();
            result.id = data['Id'];
            result.name = data['Name'];
            if (data['Departments']) {
                result.departments = [];
                for (var i = 0; i < data['Departments'].length; i++) {
                    result.departments.push(Department.loadFromJSON(data['Departments'][i]));
                }
            }
            return result;
        }

        public static async getCollegeList(): Promise<College[]> {
            var responseJSON = await postAsync('api/Department/list', null, {college:true});
            var result = [];
            for (var i = 0; i < responseJSON['Result'].length; i++) {
                var temp = responseJSON['Result'][i].College;
                temp.Departments = responseJSON['Result'][i].Departments;
                result.push(College.loadFromJSON(temp));
            }
            return result;
        }
    }
}