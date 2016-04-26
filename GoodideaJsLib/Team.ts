module goodidea {
    export class Team {
        public name:string;
        public group: TeamMember[] = [];

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