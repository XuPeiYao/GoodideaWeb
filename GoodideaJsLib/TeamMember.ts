module goodidea {
    export class TeamMember {
        public id:string;
        public isTeacher:boolean;
        public isAssistant:boolean;
        public user: User;

        public static loadFromJSON(data: JSON): TeamMember {
            var result = new TeamMember();
            var fields = data.getKeys();

            for (var i = 0; i < fields.length; i++) {
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.user = User.loadFromJSON(data['User']);

            return result;
        }
    }
}