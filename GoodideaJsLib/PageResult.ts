module goodidea {
    export class PageResult<T> {
        public params: any = {};
        public url: string;
        public count: number = 0;
        public index: number = 0;
        public length: number;

        public result: T[];
        private type: any;

        constructor(type: any) {
            this.type = type;
        }

        public hasNext(): boolean {
            return this.index + this.length < this.count;
        }

        public async load(): Promise<void> {
            var data = {
                index: this.index,
                length: this.length
            };
            for (var key in this.params) data[key] = this.params[key];

            var responseJSON = await postAsync(this.url, null, data);

            this.count = responseJSON['Count'];
            this.result = [];
            for (var i = 0; i < responseJSON['Result'].length; i++) {
                this.result.push(this.type['loadFromJSON'](responseJSON['Result'][i]));
            }
        }

        public async nextPage(): Promise<PageResult<T>> {
            var result = new PageResult<T>(this.type);
            result.index = this.index + this.length;
            result.length = this.length;
            result.params = this.params;
            result.url = this.url;
            
            await result.load();
            return result;
        }

        public static loadFromJSON<T>(type : any,data: JSON): PageResult<T> {
            var result = new PageResult<T>(type);
            result.result = [];
            for (var i = 0; i < data['Result'].length; i++) {            
                result.result.push(type['loadFromJSON'](data['Result'][i]));
            }

            return result;
        }
    }
}