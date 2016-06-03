app.controller('about', async function ($scope, $sce, $uibModal) {
    $scope.loading = true;
    $scope.loginUser = await goodidea.User.getLoginUser();
    if ($scope.loginUser && $scope.loginUser.id == queryString['id']) {
        $scope.user = $scope.loginUser;
        $scope.editable = true;
    } else {
        $scope.user = await goodidea.User.getUserById(queryString['id']);
        $scope.editable = false;
    }
    $scope.loading = false;
    $scope.$apply();
    console.log($scope.user)
});