module goodidea {
    export class ForumResultPage {
        public index: number = 0;
        public length: number;
        public count: number;
        public team: boolean;

        public url: string;
        public result: Forum[];

        public hasNext(): boolean {
            return this.index < this.count;
        }

        public async nextPage(): Promise<ProjectResultPage>{
            var data = {
                length: this.length,
                index: this.index + this.length,
                team: this.team
            };

            var responseJSON = await postAsync(this.url, null, data);

            var result = ProjectResultPage.loadFromJSON(responseJSON);
            result.url = this.url;
            result.index = data.index;
            result.length = data.length;
            result.count = responseJSON['Count'];
            return result;
        }

        public static loadFromJSON(data: JSON): ForumResultPage {
            var result = new ForumResultPage();
            result.result = [];
            for (var i = 0; i < data['length']; i++) {
                result.result.push(Forum.loadFromJSON(data[i]));
            }

            return result;
        }
    }
}