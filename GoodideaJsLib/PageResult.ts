module goodidea {
    export class PageResult<T> {
        /*
         * 分頁查詢參數
         */
        public params: any = {};

        /*
         * 查詢目標Api
         */
        public url: string;

        /*
         * 查詢結果總數量
         */
        public count: number = 0;

        /*
         * 目前查詢結果起始索引
         */
        public index: number = 0;

        /*
         * 單一分頁最多數量
         */
        public length: number;

        /*
         * 查詢結果
         */
        public result: T[];
        private type: any;

        /**
         * 建構分頁查詢結果
         * @param type 結果類型
         */
        constructor(type: any) {
            this.type = type;
        }

        /**
         * 是否有下一個分頁
         */
        public hasNext(): boolean {
            return this.index + this.length < this.count;
        }

        /*
         * 讀取查詢結果
         */
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

        /*
         * 取得下一頁查詢結果
         */
        public async nextPage(): Promise<PageResult<T>> {
            var result = new PageResult<T>(this.type);
            result.index = this.index + this.length;
            result.length = this.length;
            result.params = this.params;
            result.url = this.url;
            
            await result.load();
            return result;
        }

        /**
         * 由JSON資料產生PageResult
         * @param data 資料來源
         */
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