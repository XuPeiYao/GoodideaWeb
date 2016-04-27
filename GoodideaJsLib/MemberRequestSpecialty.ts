module goodidea {
    export class MemberRequestSpecialty {
        public id: string;
        public value: string;

        public static loadFromJSON(data: JSON): MemberRequestSpecialty {
            var result = new MemberRequestSpecialty();
            result.id = data['Id'];
            result.value = data['Value'];
            return result;
        }
    }
}