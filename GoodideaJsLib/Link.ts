module goodidea {
    export class Link {
        public id: string;
        public name: string;
        public url: string;

        public static loadFromJSON(data: JSON): Link {
            var result = new Link();
            result.id = data['Id'];
            result.name = data['Name'];
            result.url = data['Url'];
            return result;
        }

        public static async getLinkList(): Promise<Link[]> {
            var responseJSON = await postAsync('api/link/list');
            var result = [];
            for (var i = 0; i < responseJSON['Result'].length; i++) {
                result.push(Link.loadFromJSON(responseJSON['Result'][i]));
            }
            return result;
        }
    }
}