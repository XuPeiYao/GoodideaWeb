app.controller('bannerPlayer', async function ($scope, $sce, $uibModal) {
    $scope.banners = await goodidea.Banner.getBannerList();
    $scope.banners.map((x,i) => {
        x.index = $scope.banners.length - i - 1;
        return x;
    });
    $scope.active = 0;
    $scope.$apply();//通知$scope更新
    
    var bannerPlayer = document.querySelector('[ng-controller="bannerPlayer"]');
    bannerPlayer.querySelectorAll('.carousel-control')
        .toArray()
        .forEach((x: Node) => x.parentNode.removeChild(x));//移除上一張圖與下一張圖按鈕
});

app.controller('newsViewer', async function ($scope, $sce, $uibModal) {
    $scope.newsList = [];

    $scope.lastPage = await goodidea.News.getNewsList();
    $scope.nowPage = 0;
    $scope.newsList.push($scope.lastPage.result);
    $scope.news = $scope.newsList[$scope.nowPage];

    $scope.previous = async function () {
        if ($scope.nowPage == 0) return;
        $scope.nowPage--; ;
        $scope.news = [];
        $scope.news = $scope.newsList[$scope.nowPage];
        componentHandler.upgradeDom();
    }
    $scope.forward = async function () {
        $scope.nowPage++;
        if ($scope.nowPage >= $scope.newsList.length) {
            $scope.lastPage = await $scope.lastPage.nextPage();
            $scope.newsList.push($scope.lastPage.result);
        }
        $scope.news = [];
        $scope.news = $scope.newsList[$scope.nowPage];
        $scope.$apply();
    }
    $scope.$apply();
    
});