//背景圖片輪播器
app.controller('bannerPlayer', async function ($scope, $sce, $uibModal) {
    $scope.banners = await goodidea.Banner.getBannerList();
    $scope.banners.map((x,i) => {
        x.index = $scope.banners.length - i - 1;
        return x;
    });
    $scope.active = 0;
    $scope.$apply();//通知更新
    
    var bannerPlayer = document.querySelector('[ng-controller="bannerPlayer"]');
    bannerPlayer.querySelectorAll('.carousel-control')
        .toArray()
        .forEach((x: Node) => x.parentNode.removeChild(x));//移除上一張圖與下一張圖按鈕

    bannerPlayer.querySelectorAll('.banner-image')
        .toArray()
        .forEach((x: Node) => {
            var node = x.cloneNode();
            var target = x.parentNode.parentNode;
            target.removeChild(x.parentNode);
            target.appendChild(node);
        });
});

//最新消息檢視器
app.controller('newsViewer', async function ($scope, $sce, $uibModal) {
    $scope.lastPageResult = null;
    $scope.newsPageList = [];
    $scope.nowPage = 0;
    $scope.loading = false;

    $scope.loadPage = async (page) => {
        $scope.loading = true;
        if (page == 0 && $scope.newsPageList.length == 0) {
            $scope.lastPageResult = await goodidea.News.getNewsList();
            $scope.newsPageList.push($scope.lastPageResult.result);        
        } else if (page >= $scope.newsPageList.length) {//load new page
            $scope.lastPageResult = await $scope.lastPageResult.nextPage();
            $scope.newsPageList.push($scope.lastPageResult.result);        
        }
        $scope.news = $scope.newsPageList[page];
        $scope.nowPage = page;
        $scope.loading = false;
    };

    $scope.loadPage(0);

    $scope.previous = async () => {
        if ($scope.nowPage == 0) return;
        await $scope.loadPage($scope.nowPage - 1);
    }
    $scope.forward = async () => {
        await $scope.loadPage($scope.nowPage + 1);
        $scope.$apply();//通知更新
    }
    $scope.openNews = async (t) => {
        if ($scope.loading) return;
        $scope.loading = true;
        var news = await goodidea.News.getNewsById(t.id);   
             
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
    }
});
app.controller('newsViewModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, news, $uibModal) {
    for (var key in news) $scope[key] = news[key];
    $scope.files = $scope.files.map(x => {
        x.typeString = x.file.type == goodidea.FileType.Image ? "圖片" : "文件";
        return x;
    });
    $scope.contentHtml = $sce.trustAsHtml(markdown.toHtml($scope.content));
    $scope.cancel = () => $uibModalInstance.close();
});