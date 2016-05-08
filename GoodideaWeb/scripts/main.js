var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
console.log3D = (value) => {
    console.log("%c" + value, "text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:20pt");
};
var markdown = {
    config: {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: 'language-',
        linkify: false,
        typographer: true // Enable smartypants and other sweet transforms
    },
    markdownObject: null,
    init: function () {
        markdown.markdownObject = markdownit(markdown.config)
            .use(markdownitSub)
            .use(markdownitSup)
            .use(markdownitVideo, {
            youtube: { width: 640, height: 480 },
            vimeo: { width: 640, height: 480 },
            vine: { width: 600, height: 480, embed: 'simple' }
        });
    },
    toHtml: function (markdownString) {
        if (!markdownString)
            return "";
        markdownString = markdownString.replace(/!\[youtube\]/g, '@[youtube]'); //goodidea youtube 語法
        return markdown.markdownObject.render(markdownString);
    }
};
markdown.init();
/**
 * 修正指定區域內的mdl輸入欄位再有數值的情況下無isDirty問題
 * @param area 指定區域
 */
function fixMdlTextfields(area) {
    area
        .getElementsByClassName('mdl-textfield')
        .toArray()
        .forEach((x) => {
        var inputs = x.getElementsByTagName('input').toArray();
        var selects = x.getElementsByTagName('select').toArray();
        var target = null;
        if (inputs.length) {
            target = inputs[0];
        }
        else if (selects.length) {
            target = selects[0];
        }
        else {
            return;
        }
        if (target.value.length) {
            x.classList.add('is-dirty');
        }
    });
}
function fixMdlButton(area) {
    area
        .getElementsByClassName('mdl-button')
        .toArray()
        .forEach((x) => {
        console.log(x);
        x.attributes.removeNamedItem('data-upgraded');
        componentHandler.upgradeElement(x);
    });
}
function fixMdlTooltip(area) {
    console.log(area);
    area
        .getElementsByClassName('mdl-tooltip')
        .toArray()
        .forEach((x) => {
        console.log(x);
        x.attributes.removeNamedItem('data-upgraded');
        componentHandler.upgradeElement(x);
    });
}
include();
componentHandler.upgradeAllRegistered();
//componentHandler.upgradeDom();
var queryString = {};
(function () {
    if (!location.search)
        return;
    var keyvaluePairs = location.search.substring(1).split('&');
    for (var i = 0; i < keyvaluePairs.length; i++) {
        var keyvalue = keyvaluePairs[i].split('=').map(x => decodeURIComponent(x));
        queryString[keyvalue[0].toLowerCase()] = keyvalue[1];
    }
})();
console.clear();
console.log3D("創意創新雲端平台");
console.info("SDK版本: " + goodidea.version);
console.warn("請注意，這是專門提供給開發人員的瀏覽器功能。您在此處的操作將有可能影響到您在平台上的資料，請謹慎使用。");
goodidea.origin = location.origin; //設定允許域
console.info(`允許域設定為: ${goodidea.origin}`);
//初始化應用程式範圍
var app = angular.module('app', ['ngAnimate', 'ui.bootstrap']);
//#region 導覽列控制器
var navController = function ($scope, $sce, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        var loginUser = yield goodidea.User.getLoginUser();
        console.info(`目前登入帳戶: ${(loginUser ? loginUser.id : "<未登入>")}`);
        $scope.urls = yield goodidea.Link.getLinkList();
        $scope.$apply();
        $scope.loginUser = yield goodidea.User.getLoginUser();
        $scope.$apply();
        $scope.login = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'modals/login.html',
                controller: 'loginModal',
                size: 'sm',
                resolve: {}
            }).rendered.then(() => {
                componentHandler.upgradeDom();
            });
        };
        $scope.logout = function () {
            return __awaiter(this, void 0, void 0, function* () {
                swal({
                    type: "warning",
                    title: "登出確認",
                    text: "您是否真的要進行登出動作?登出前請確認所作變更已經儲存",
                    showCancelButton: true,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消"
                }, function (isConfirm) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (isConfirm) {
                            swal({
                                title: "登出中",
                                text: "系統正在執行登出操作，操作完成後本視窗自動關閉",
                                showConfirmButton: false
                            });
                            yield goodidea.User.logout();
                            location.reload();
                        }
                    });
                });
            });
        };
    });
};
app.controller('nav_top', navController);
app.controller('nav_left', navController);
console.info("導覽列功能初始化完成");
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.6&appId=1688408974746241";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//#endregion
app.controller('loginModal', function ($scope, $sce, $uibModalInstance, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        $scope.loading = false;
        $scope.id = "";
        $scope.pwd = "";
        $scope.login = () => __awaiter(this, void 0, void 0, function* () {
            if (!$scope.id || !$scope.id.length || !$scope.pwd || !$scope.pwd.length) {
                swal({
                    type: 'error',
                    title: "資料缺漏",
                    text: "使用者帳號與密碼為必填項目",
                    confirmButtonText: "確定"
                });
                return;
            }
            $scope.loading = true;
            swal({
                title: "登入中",
                text: "系統正在驗證您的資訊，成功登入後本視窗自動關閉",
                showConfirmButton: false
            });
            try {
                yield goodidea.User.login($scope.id, $scope.pwd); //嘗試登入
                $scope.loading = false;
                $scope.$apply(); //通知更新
                location.reload();
            }
            catch (e) {
                swal({
                    type: 'error',
                    title: e.name,
                    text: e.message,
                    confirmButtonText: "確定"
                }, (value) => {
                    $scope.loading = false;
                    $scope.$apply(); //通知更新
                });
            }
        });
        $scope.facebookLogin = () => {
            FB.login(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (response.authResponse) {
                        console.log('Facebook登入成功');
                        $scope.loading = true;
                        swal({
                            title: "登入中",
                            text: "系統正在驗證您的資訊，成功登入後本視窗自動關閉",
                            showConfirmButton: false
                        });
                        try {
                            yield goodidea.User.fblogin(response.authResponse.accessToken); //嘗試登入
                            $scope.loading = false;
                            $scope.$apply(); //通知更新
                            location.reload();
                        }
                        catch (e) {
                            swal({
                                type: 'error',
                                title: e.name,
                                text: e.message,
                                confirmButtonText: "確定"
                            }, (value) => {
                                $scope.loading = false;
                                $scope.$apply(); //通知更新
                            });
                        }
                    }
                    else {
                        console.log('使用者取消Facebook登入');
                    }
                });
            }, {
                scope: 'public_profile'
            });
        };
        $scope.cancel = () => $uibModalInstance.close();
    });
});
//# sourceMappingURL=main.js.map