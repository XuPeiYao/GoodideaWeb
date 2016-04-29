(async () => {
    /*await include();*/
    
    var list = await goodidea.Project.getProjectList(null, null, null);//取得提案列表
    var index = 1;
    
    while (false) {
        list.result.forEach(x => {            
            document.writeln("<p>" + (index++) + ". " + x.name + "(" + x.lastEditTime + ")</p>");
        });
        if (!list.hasNext()) break;//沒有下一頁
        list = await list.nextPage();//取得下一頁
    }
})();