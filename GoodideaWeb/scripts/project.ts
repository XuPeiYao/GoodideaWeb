app.controller('project', async function ($scope, $sce, $uibModal) {
    $scope.project = null;
    $scope.loginUser = null;
    $scope.voteQuota = 0;
    $scope.load = async () => {
        $scope.loading = true;
        $scope.projectId = queryString['id'];
        try {
            $scope.loginUser = await goodidea.User.getLoginUser();
            $scope.project = await goodidea.Project.getProjectById($scope.projectId);
            if ($scope.loginUser && $scope.project.competition) {
                $scope.voteQuota = await goodidea.Competition.getLoginUserQuota($scope.project.competition);
            }
        } catch (e) {
            swal({
                type: 'error',
                title: "無效的提案ID",
                text: "您目前的檢視頁面連結是無效的，這可能是因為該提案並未公開且您目前的身分無法檢視(或登入逾時)或已經刪除",
                confirmButtonText: "確定"
            });
            return;
        }
        $scope.$apply();
        
        if (!$scope.project.cover) $scope.project.cover = (await goodidea.Banner.getBannerList())[0]
        console.log($scope.project)
        $scope.loading = false;
        
        $scope.$apply();//通知更新
    } 

    await $scope.load();

    $scope.$apply();

});