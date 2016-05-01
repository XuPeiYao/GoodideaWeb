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
        .forEach((x: Node) => x.parentNode.removeChild(x));//移除上一頁與下一頁按鈕
});