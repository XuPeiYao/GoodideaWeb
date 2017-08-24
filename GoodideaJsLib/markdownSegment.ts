module goodidea {
    /**
     * markdown章節剖析
     */
    export class MarkdownSegment {
        public level: number;
        public title: string;
        public content: string;
        private contentIndex: number;

        constructor(content: string) {
            this.content = content;
            this.level = 0;
        }

        public getSegments(): MarkdownSegment[] {
            var temp = MarkdownSegment.parse(this.content);
            if (temp == null) return [];
            return temp.map(x => {
                x.level = this.level + 1;
                return x;
            });
        }

        public static parse(content: string, level?: number): MarkdownSegment[] {
            if (!level) level = 1;
            var result: MarkdownSegment[] = [];

            var regex = new RegExp("^" + "#".repeat(level) + "\\s+.+");

            var lines = content.replace(/\r/g, "").split("\n");

            for (var index = 0; index < lines.length; index++) {
                if (!regex.test(lines[index])) continue;

                var newItem = new MarkdownSegment(null);
                newItem.level = 0;
                newItem.title = lines[index].trim().split(/\s+/g, 2)[1];
                newItem.contentIndex = index;

                result.push(newItem);
            }

            if (result.length == 0 && level == 11) {
                return null;
            } else if (result.length == 0) {
                return MarkdownSegment.parse(content, level + 1);
            }

            if (result.first().contentIndex != 0) {
                var newItem = new MarkdownSegment(null);
                newItem.level = 0;
                newItem.title = null;
                newItem.contentIndex = 0;
                result.splice(0, 0, newItem);
            }

            for (var index = 0; index < result.length; index++) {
                var endIndex = lines.length - 1;
                if (index != result.length - 1) {
                    endIndex = result[index + 1].contentIndex;
                }

                result[index].content = lines
                    .skip(result[index].contentIndex + 1)
                    .take(endIndex - result[index].contentIndex - 1)
                    .join("\n");
            }

            return result;
        }
    }
}