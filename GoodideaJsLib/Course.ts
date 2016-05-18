module goodidea {
    export class Course {
        public id: string;
        public year: number;
        public semester: number;
        public cId: string;
        public cName: string;
        public teacherName: string;
        public teacherEmail: string;

        public static loadFromJSON(data: JSON): Course {
            var result = new Course();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }

            return result;
        }

        public static async getCourseList(): Promise<Course[]> {
            var responseJSON = await goodidea.postAsync('api/course/list');

            var result = [];
            for (var i = 0; i < responseJSON['length']; i++) {
                result.push(Course.loadFromJSON(responseJSON[i]));
            }

            return result;
        }
    }
}