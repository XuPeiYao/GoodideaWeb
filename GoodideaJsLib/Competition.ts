module goodidea {
    export class Competition {
        /**
         * 競賽Id
         */
        public id: string;

        /**
         * 競賽名稱
         */
        public name: string;

        /**
         * 用戶在該競賽可投票數
         */
        public userVotes: number;

        /**
         * 投稿後即公開
         */
        public publishOnSubmit: boolean;

        /**
         * 需要指導教授
         */
        public needTeacher: boolean;

        /**
         * 最多成員數限制
         */
        public maxMember: number;

        /**
         * 最少成員數限制
         */
        public minMember: number;

        /**
         * 單一使用者單一重複參賽次數
         */
        public repeatCount: number;

        /**
         * 提案範本
         */
        public template: number;

        /**
         * 競賽限制投稿分類
         */
        public condition: Class[];

        /**
         * 由JSON資料產生Competition
         * @param data 資料來源
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
         * 透過限制條件取得競賽清單
         * @param active 目前可參賽
         * @param vote 目前可投票
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
         * 取得目前登入使用者針對指定競賽剩餘可投票數
         * @param competition 競賽
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