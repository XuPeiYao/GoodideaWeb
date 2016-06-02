module goodidea {
    export class TimeRange{
        public Start: Date
        public End: Date;

        /**
         * 由JSON資料產生TimeRange
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): TimeRange {
            if (data == null) return null;

            var result = new TimeRange();

            result.Start = new Date(data['Start']);
            result.End = new Date(data['End']);

            return result;
        }
    }
}