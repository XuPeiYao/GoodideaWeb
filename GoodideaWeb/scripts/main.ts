interface Console {
    log3D(value: string): void;
    logImage(url: string): void;
}
console.log3D = (value: string) => {
    console.log("%c" + value, "text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:20pt");
}

include();
componentHandler.upgradeAllRegistered();

console.clear();
console.log3D("創意創新雲端平台");
console.info("SDK版本: " + goodidea.version);
console.warn("請注意，這是專門提供給開發人員的瀏覽器功能。您在此處的操作將有可能影響到您在平台上的資料，請謹慎使用。");

goodidea.origin = location.origin;//設定允許域
console.info(`允許域設定為: ${goodidea.origin}`);

//初始化應用程式範圍
var app = angular.module('app', ['ngAnimate','ui.bootstrap']);

//#region 導覽列控制器
var navController = async function ($scope, $sce, $uibModal) {
    var loginUser = await goodidea.User.getLoginUser();
    console.info(`目前登入帳戶: ${(loginUser ? loginUser.id : "<未登入>")}`);

    $scope.urls = await goodidea.Link.getLinkList();
    $scope.$apply();

    $scope.loginUser = await goodidea.User.getLoginUser();
    $scope.$apply();
}
app.controller('nav_top', navController);
app.controller('nav_left', navController);
console.info("導覽列功能初始化完成");
//#endregion