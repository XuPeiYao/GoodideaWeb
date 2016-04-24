module goodidea {
    export class College {
        public id: string;
        public name: string;
        
        public static loadFromJSON(data: JSON): College {
            var result = new College();
            result.id = <string>data['Id'];
            result.name = <string>data['Name'];
            return result;
        }
    }
}