module goodidea {
    export class ProjectResultPage {
        public index:number;
        public count:number;
        public result:Project[];
        public url:string;
        public async nextPage(): Promise<ProjectResultPage>{
            return null;
        }
    }
}