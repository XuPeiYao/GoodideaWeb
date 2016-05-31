module goodidea {
    export class Competition {
        /**
         * �v��Id
         */
        public id: string;

        /**
         * �v�ɦW��
         */
        public name: string;

        /**
         * �Τ�b���v�ɥi�벼��
         */
        public userVotes: number;

        /**
         * ��Z��Y���}
         */
        public publishOnSubmit: boolean;

        /**
         * �ݭn���ɱб�
         */
        public needTeacher: boolean;

        /**
         * �̦h�����ƭ���
         */
        public maxMember: number;

        /**
         * �̤֦����ƭ���
         */
        public minMember: number;

        /**
         * ��@�ϥΪ̳�@���ư��ɦ���
         */
        public repeatCount: number;

        /**
         * ���׽d��
         */
        public template: number;

        /**
         * �v�ɭ����Z����
         */
        public condition: Class[];

        /**
         * ��JSON��Ʋ���Competition
         * @param data ��ƨӷ�
         */
        public static loadFromJSON(data: JSON): Competition {
            var result = new Competition();
            var fields = getKeys(data);

            for (var i = 0; i < fields.length; i++) {
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }

            result.condition = [];
            for (var i = 0; i < data['Condition'].length; i++) {
                result.condition.push(Class.loadFromJSON(data['Condition'][i]['Class']));
            }

            return result;
        }

        /**
         * �z�L���������o�v�ɲM��
         * @param active �ثe�i����
         * @param vote �ثe�i�벼
         */
        public static async getCompetitionList(active: boolean, vote: boolean): Promise<Competition[]> {
            var responseJSON = await postAsync('api/competition/list', null, { active: active, vote: vote });

            var result = [];

            for (var i = 0; i < responseJSON['Result'].length; i++) {
                result.push(Competition.loadFromJSON(responseJSON['Result'][i]));
            }

            return result;
        }

        /**
         * ���o�ثe�n�J�ϥΪ̰w����w�v�ɳѾl�i�벼��
         * @param competition �v��
         */
        public static async getLoginUserQuota(competition: string | Competition): Promise<number> {
            var id = competition['id'] || competition;
            var responseJSON = await postAsync('api/Competition/getuserquota', null, {
                Competition: id
            });
            return responseJSON['Result'];
        }
    }
}