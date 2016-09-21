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
        bannerPlayer.querySelectorAll('.banner-image')
            .toArray()
            .forEach((x) => {
            var node = x.cloneNode();
            var target = x.parentNode.parentNode;
            target.removeChild(x.parentNode);
            target.appendChild(node);
        });
    });
});
//最新消息檢視器
app.controller('newsViewer', function ($scope, $sce, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        $scope.lastPageResult = null;
        $scope.newsPageList = [];
        $scope.nowPage = 0;
        $scope.loading = false;
        $scope.loadPage = (page) => __awaiter(this, void 0, void 0, function* () {
            $scope.loading = true;
            if (page == 0 && $scope.newsPageList.length == 0) {
                $scope.lastPageResult = yield goodidea.News.getNewsList();
                $scope.newsPageList.push($scope.lastPageResult.result);
            }
            else if (page >= $scope.newsPageList.length) {
                $scope.lastPageResult = yield $scope.lastPageResult.nextPage();
                $scope.newsPageList.push($scope.lastPageResult.result);
            }
            $scope.news = $scope.newsPageList[page];
            $scope.nowPage = page;
            $scope.loading = false;
        });
        $scope.loadPage(0);
        $scope.previous = () => __awaiter(this, void 0, void 0, function* () {
            if ($scope.nowPage == 0)
                return;
            yield $scope.loadPage($scope.nowPage - 1);
        });
        $scope.forward = () => __awaiter(this, void 0, void 0, function* () {
            yield $scope.loadPage($scope.nowPage + 1);
            $scope.$apply(); //通知更新
        });
        $scope.openNews = (t) => __awaiter(this, void 0, void 0, function* () {
            if ($scope.loading)
                return;
            $scope.loading = true;
            var news = yield goodidea.News.getNewsById(t.id);
            $uibModal.open({
                animation: true,
                templateUrl: 'modals/newsView.html',
                controller: 'newsViewModal',
                resolve: {
                    news: () => news
                }
            }).rendered.then(() => {
                $scope.loading = false;
                componentHandler.upgradeDom();
            });
        });
    });
});
app.controller('newsViewModal', function ($scope, $sce, $uibModalInstance, news, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var key in news)
            $scope[key] = news[key];
        $scope.files = $scope.files.map(x => {
            x.typeString = x.file.type == goodidea.FileType.Image ? "圖片" : "文件";
            return x;
        });
        $scope.contentHtml = $sce.trustAsHtml(markdown.toHtml($scope.content));
        $scope.cancel = () => $uibModalInstance.close();
    });
});
//# sourceMappingURL=index.js.map