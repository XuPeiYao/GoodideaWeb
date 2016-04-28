var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
(() => __awaiter(this, void 0, void 0, function* () {
    /*await include();*/
    goodidea.origin = location.origin; //設定允許域
    var list = yield goodidea.Project.getProjectList(null, null, null); //取得提案列表
    var index = 1;
    while (true) {
        list.result.forEach(x => {
            document.writeln("<p>" + (index++) + ". " + x.name + "(" + x.lastEditTime + ")</p>");
        });
        if (!list.hasNext())
            break; //沒有下一頁
        list = yield list.nextPage(); //取得下一頁
    }
}))();
//# sourceMappingURL=index.js.map