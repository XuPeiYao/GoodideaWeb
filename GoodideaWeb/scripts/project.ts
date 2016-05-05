app.controller('project', async function ($scope, $sce, $uibModal) {
    $scope.project = null;
    
    $scope.load = async () => {
        $scope.loading = true;
        $scope.project = await goodidea.Project.getProjectById(queryString['id']);
        $scope.$apply();
        if (!$scope.project.cover) $scope.project.cover = (await goodidea.Banner.getBannerList())[0];
        console.log($scope.project)
        $scope.loading = false;
        
        $scope.$apply();//通知更新
    } 

    await $scope.load();

    $scope.$apply();

});