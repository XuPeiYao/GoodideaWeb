module goodidea {
    export class UserProjectList {
        public own: Project[] = [];
        public participate: Project[] = [];

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