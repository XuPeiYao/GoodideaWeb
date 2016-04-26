module goodidea {
    export class Class {
        public id: string;
        public name: string;

        public static loadFromJSON(data: JSON): Class {
            var result = new Class();
            result.id = data['Id'];
            result.name = data['Name'];

            return result;
        }

        public static async getClassList(): Promise<Class[]> {
            var result = [];
            var responseJSON = await postAsync('api/class/list');

            for (var i = 0; i < responseJSON['Result'].length; i++) {
                result.push(Class.loadFromJSON(responseJSON['Result'][i]));
            }

            return result;
        }
    }
}