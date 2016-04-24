module goodidea {
    export class DocumentInfo {
        public id:string;
        public name:string;
        public file:FileInfo;
        
        public static loadFromJSON(data: JSON): DocumentInfo{
            var result = new DocumentInfo();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[fields[i].toLowerCase()] = data[fields[i]];
            }
            result.file = FileInfo.loadFromJSON(data['File']);
            return result;
        }
    }
}