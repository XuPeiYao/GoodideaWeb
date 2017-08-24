module goodidea {
    export enum MemberType {
        teacher, assistant, member
    }

    export class TeamMember {
        /**
         * �ζ�������TId
         */
        public id: string;

        /**
         * �O�_�����ɦѮv
         */
        public isTeacher: boolean;

        /**
         * �O�_���U��
         */
        public isAssistant: boolean;

        /**
         * �ϥΪ�
         */
        public user: User;

        /**
         * ���o�γ]�w�ζ���������
         */
        public getMemberType(): MemberType {
            if (!this.isTeacher) return MemberType.member;
            return this.isAssistant ? MemberType.assistant : MemberType.teacher;
        }
        public setMemberType(value: MemberType) {
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
         * ��JSON��Ʋ���TeamMember
         * @param data ��ƨӷ�
         */
        public static loadFromJSON(data: JSON): TeamMember {
            var result = new TeamMember();
            var fields = getKeys(data);

            for (var i = 0; i < fields.length; i++) {
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.user = User.loadFromJSON(data['User']);

            return result;
        }
    }
}