app.controller('about', async function ($scope, $sce, $uibModal) {
    $scope.loading = true;
    $scope.loginUser = await goodidea.User.getLoginUser();
    $scope.loading = false;
    $scope.$apply();
    //讀取提案
    $scope.load = async () => {

    }
});