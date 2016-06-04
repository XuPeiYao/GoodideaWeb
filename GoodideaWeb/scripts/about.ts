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
   

    $scope.user.htmlContent = $sce.trustAsHtml(markdown.toHtml($scope.user.information));
    $scope.user.projectList = await goodidea.Project.getUserProjects(<goodidea.User>$scope.user);
    var nowTime = new Date();
    $scope.user.projectList.own.forEach(x => {
        var time = (nowTime.getTime() + 8 * 3600 * 1000) - x.lastEditTime;
        var day = Math.floor(time / (24 * 3600 * 1000));
        time %= 24 * 3600 * 1000;

        var hours = Math.floor(time / (3600 * 1000));
        time %= 3600 * 1000;

        var minnutes = Math.floor(time / (60 * 1000));
        time %= 60 * 1000;

        var seconds = Math.floor(time / 1000);
        var updateString = "";
        if (day > 0) updateString += `${day}天`;
        if (hours > 0 && day == 0) updateString += `${hours}時`;
        if (minnutes > 0 && hours == 0) updateString += `${minnutes}分`;
        if (seconds > 0 && minnutes == 0) updateString += `${seconds}秒`;
        updateString += "前更新";

        x.timeString = updateString;
    });
    $scope.loading = false;
    $scope.$apply();

    if (queryString['tab']) {
        var temp = <HTMLElement>document.querySelector(`[href="#${queryString['tab']}"]`);
        if (temp) temp.click();
    }

    console.log($scope.user)
});