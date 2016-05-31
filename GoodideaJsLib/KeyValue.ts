module goodidea {
    export class KeyValue{        
        public id: string;
        public value: string;

        public static loadFromJSON(data: JSON): KeyValue {
            var result = new KeyValue();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[fields[i].toLowerCase()] = data[fields[i]];
            }
            return result;
        }
    }
}