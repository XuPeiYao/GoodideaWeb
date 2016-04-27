module goodidea {
    export class Forum {
        public id: string;
        public editable: boolean;
        public time: Date;
        public groupOnly: boolean;
        public content: string;
        public user: User;

        public async remove(): Promise<void> {
            await postAsync('api/forum/remove', null, {
                forum: this.id
            });
        }

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

        public static async getForumList(project: Project | string,teamOnly: boolean): Promise<ForumResultPage> {
            var result = new ForumResultPage();
            var id = project['id'] || project;
            var responseJSON = await postAsync('api/forum/list', null, {
                project: id,
                length: 10,
                team: teamOnly
            });

            return ForumResultPage.loadFromJSON(responseJSON['Result']);
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