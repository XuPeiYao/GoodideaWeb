module goodidea {
    export class TimeRange{
        public start: Date
        public end: Date;

        /**
         * 由JSON資料產生TimeRange
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): TimeRange {
            if (data == null) return null;

            var result = new TimeRange();

            result.start = new Date(data['Start']);
            result.end = new Date(data['End']);

            return result;
        }
    }
}