module goodidea {
    export class Course {
        /**
         * 課程Id
         */
        public id: string;

        /**
         * 課程年份
         */
        public year: number;

        /**
         * 學期
         */
        public semester: number;

        /**
         * 課程編號
         */
        public cId: string;

        /**
         * 課程名稱
         */
        public cName: string;

        /**
         * 教師名稱
         */
        public teacherName: string;

        /**
         * 教師信箱
         */
        public teacherEmail: string;

        /**
         * 由JSON資料產生Course
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): Course {
            var result = new Course();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }

            return result;
        }

        /**
         * 取得現有課程列表
         */
        public static async getCourseList(): Promise<Course[]> {
            var responseJSON = await goodidea.postAsync('api/course/list');
            var result = [];
            for (var i = 0; i < responseJSON['Result']['length']; i++) {
                result.push(Course.loadFromJSON(responseJSON['Result'][i]));
            }

            return result;
        }
    }
}