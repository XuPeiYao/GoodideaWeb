module goodidea {
    export class Forum {
        public id: string;
        public editable: boolean;
        public time: Date;
        public groupOnly: boolean;
        public content: string;
        public user: User;

        /**
         * 刪除這個討論
         */
        public async remove(): Promise<void> {
            await postAsync('api/forum/remove', null, {
                forum: this.id
            });
        }

        /**
         * 建立新的討論
         * @param project 目標提案的ID或Project物件
         * @param teamOnly 是否僅團隊可見(必須為團隊成員)
         * @param content 內容
         */
        public static async createForum(project: Project | string, teamOnly: boolean, content: string): Promise<Forum> {
            var result = new Forum();
            var id = project['id'] || project;
            var responseJSON = await postAsync('api/forum/add', null, {
                project: id,
                team: teamOnly,
                content: content
            });

            return Forum.loadFromJSON(responseJSON['Result']);
        }

        /**
         * 取得指定提案的討論清單
         * @param project 指定提案的ID或Project物件
         * @param teamOnly 是否為團隊訊息(必須為團隊成員)
         */
        public static async getForumList(project: Project | string,teamOnly: boolean): Promise<ForumResultPage> {
            var id = project['id'] || project;
            var responseJSON = await postAsync('api/forum/list', null, {
                project: id,
                length: 10,
                team: teamOnly
            });
            
            var result = ForumResultPage.loadFromJSON(responseJSON['Result']);
            result.index = 0;
            result.length = 10;
            result.team = teamOnly;
            result.url = 'api/forum/list';
            result.count = responseJSON['Count'];
            return result;
        }

        public static loadFromJSON(data: JSON): Forum {
            var result = new Forum();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.user = User.loadFromJSON(data['User']);
            result.time = new Date(data['Time']);
            return result;
        }
    }
}