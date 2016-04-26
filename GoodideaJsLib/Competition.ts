module goodidea {
    export class Competition {
        public id: string;
        public name: string;
        public userVotes: number;
        public publishOnSubmit: boolean;
        public needTeacher: boolean;
        public maxMember: number;
        public minMember: number;
        public repeatCount: number;
        public template: number;
        public condition: Class[];

        public static loadFromJSON(data: JSON): Competition {
            var result = new Competition();
            var fields = data.getKeys();

            for (var i = 0; i < fields.length; i++) {
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }

            result.condition = [];
            for (var i = 0; i < data['Condition'].length; i++) {
                result.condition.push(Class.loadFromJSON(data['Condition'][i]['Class']));
            }

            return result;
        }

        public static async getCompetitionList(active: boolean, vote: boolean): Promise<Competition[]> {
            var responseJSON = await postAsync('api/competition/list', null, { active: active, vote: vote });

            var result = [];

            for (var i = 0; i < responseJSON['Result'].length; i++) {
                result.push(Competition.loadFromJSON(responseJSON['Result'][i]));
            }

            return result;
        }
    }
}