app.controller('requestList', async function ($scope, $sce, $uibModal) {
    $scope.bannerList = await goodidea.Banner.getBannerList();

    $scope.classOptions = [{ id: 'N', name: '不分類' }];
    $scope.class = 'N';
    (await goodidea.Class.getClassList()).forEach(x => $scope.classOptions.push(x));

    $scope.keyword = '';

    $scope.orderOptions = [
        { id: goodidea.OrderBy.lastEditTime, name: '最後更新時間' },
        { id: goodidea.OrderBy.name, name: '提案名稱' },
        { id: goodidea.OrderBy.class, name: '提案分類' },
        { id: goodidea.OrderBy.views, name: '瀏覽人次' }
    ];
    $scope.order = goodidea.OrderBy.lastEditTime.toString();
    $scope.$apply();//通知更新

    $scope.lastPageResult = null;
    $scope.projectList = [];
    $scope.loading = false;
    $scope.loadNextPage = async () => {
        $scope.loading = true;
        if ($scope.lastPageResult == null) {
            $scope.lastPageResult = await goodidea.Project.getRequestProjectList(
                $scope.keyword,
                $scope.class == 'N'? null : $scope.class,
                parseInt($scope.order)
            );
        } else {
            $scope.lastPageResult = await $scope.lastPageResult.nextPage();
        }
        
        $scope.lastPageResult.result.forEach(x => {
            if (!x.cover) x.cover = $scope.bannerList[0];
            x.idString = x.id.replace(/\-/g, ''); 
            if ($scope.projectList.filter(y=>y.id == x.id).length == 0)$scope.projectList.push(x);
        });
        $scope.loading = false;
        $scope.$apply();//通知更新    
        document.getElementsByClassName('project-tooltip').toArray().forEach((x: HTMLElement) => {
            x.removeAttribute('data-upgraded');
        });
        document.getElementsByClassName('project-tooltip').toArray().forEach((x: HTMLElement) => {
            componentHandler.upgradeElement(x);
        });
    }
    $scope.reload =async () => {
        $scope.lastPageResult = null;
        $scope.projectList = [];
        await $scope.loadNextPage();
        $scope.$apply();//通知更新  
    }
    await $scope.reload();
    $scope.$apply();//通知更新  
});
