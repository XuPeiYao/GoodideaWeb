module goodidea {
    export class Department {
        /**
         * 學院Id
         */
        public collegeId: string;

        /**
         * 系所Id
         */
        public id: string;

        /**
         * 系所名稱
         */
        public name: string;    

        /**
         * 所屬學院
         */
        public college: College;

        /**
         * 由JSON資料產生Department
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): Department {
            var result = new Department();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.college = College.loadFromJSON(data['College']);
            return result;
        }

        /**
         * 取得所有系所列表
         */
        public static async getDepartmentList(): Promise<Department[]> {
            var responseJSON: JSON = await postAsync('api/Department/list');

            var dep = responseJSON['Result'];
            var result = [];
            for (var i = 0; i < dep.length; i++) {
                result.push(Department.loadFromJSON(dep[i]));
            }
            return result;
        }
    }
}