var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
//背景圖片輪播器
app.controller('bannerPlayer', function ($scope, $sce, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        $scope.banners = yield goodidea.Banner.getBannerList();
        $scope.banners.map((x, i) => {
            x.index = $scope.banners.length - i - 1;
            return x;
        });
        $scope.active = 0;
        $scope.$apply(); //通知更新
        var bannerPlayer = document.querySelector('[ng-controller="bannerPlayer"]');
        bannerPlayer.querySelectorAll('.carousel-control')
            .toArray()
            .forEach((x) => x.parentNode.removeChild(x)); //移除上一張圖與下一張圖按鈕
    });
});
//最新消息檢視器
app.controller('newsViewer', function ($scope, $sce, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        $scope.newsList = [];
        $scope.lastPage = yield goodidea.News.getNewsList();
        $scope.$apply(); //通知更新
        $scope.nowPage = 0;
        $scope.newsList.push($scope.lastPage.result);
        $scope.news = $scope.newsList[$scope.nowPage];
        $scope.previous = function () {
            return __awaiter(this, void 0, void 0, function* () {
                if ($scope.nowPage == 0)
                    return;
                $scope.nowPage--;
                $scope.news = $scope.newsList[$scope.nowPage];
                componentHandler.upgradeDom();
            });
        };
        $scope.forward = function () {
            return __awaiter(this, void 0, void 0, function* () {
                $scope.nowPage++;
                if ($scope.nowPage >= $scope.newsList.length) {
                    $scope.news = [];
                    $scope.lastPage = yield $scope.lastPage.nextPage();
                    $scope.newsList.push($scope.lastPage.result);
                }
                $scope.news = $scope.newsList[$scope.nowPage];
                $scope.$apply(); //通知更新
            });
        };
    });
});
//# sourceMappingURL=index.js.map