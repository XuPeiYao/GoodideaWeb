module goodidea {
    export class ProjectResultPage {
        public index: number = 0;
        public length: number;
        public count: number;
        public competition: Competition;
        public class: Class;
        public order: OrderBy;
        public keyword: string;
        public url: string;
        public result: Project[];

        public hasNext(): boolean {
            return this.index < this.count;
        }

        public async nextPage(): Promise<ProjectResultPage>{
            var data = {
                length: this.length,
                index: this.index + this.length,
                class: this.class ? this.class.id : 'N',
                competition: this.competition ? this.competition.id : 'N',
                order: OrderBy[this.order]
            };
            if (this.keyword) data['q'] = this.keyword;

            var responseJSON = await postAsync(this.url, null, data);

            var result = ProjectResultPage.loadFromJSON(responseJSON);
            result.url = this.url;
            result.index = data.index;
            result.length = data.length;
            result.competition = this.competition;
            result.class = this.class;
            result.keyword = this.keyword;
            result.order = this.order;

            return result;
        }

        public static loadFromJSON(data: JSON): ProjectResultPage {
            var result = new ProjectResultPage();
            result.result = [];

            for (var i = 0; i < data['Result'].length; i++) {
                result.result.push(Project.loadFromJSON(data['Result'][i]));
            }

            result.count = result['Count'];
            return result;
        }
    }
}