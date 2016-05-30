module goodidea {
    export enum MemberType {
        teacher, assistant, member
    }

    export class TeamMember {
        /**
         * 團隊成員資訊Id
         */
        public id: string;

        /**
         * 是否為指導老師
         */
        public isTeacher: boolean;

        /**
         * 是否為助教
         */
        public isAssistant: boolean;

        /**
         * 使用者
         */
        public user: User;

        /**
         * 取得或設定團隊成員類型
         */
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

        /**
         * 由JSON資料產生TeamMember
         * @param data 資料來源
         */
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