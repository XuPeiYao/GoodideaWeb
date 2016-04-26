module goodidea {
    export enum MemberType {
        teacher, assistant, member
    }

    export class TeamMember {
        public id:string;
        public isTeacher:boolean;
        public isAssistant:boolean;
        public user: User;

        public get memberType(): MemberType {
            if (!this.isTeacher) return MemberType.member;
            return this.isAssistant ? MemberType.assistant : MemberType.teacher;
        }
        public set memberType(value: MemberType) {
            switch (value) {
                case MemberType.member:
                    this.isTeacher = false; this.isAssistant = false;
                    break;
                case MemberType.assistant:
                    this.isTeacher = true; this.isAssistant = true;
                    break;
                case MemberType.teacher:
                    this.isTeacher = true; this.isAssistant = false;
                    break;
            }
        }

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