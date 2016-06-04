var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
app.controller('about', function ($scope, $sce, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        $scope.loading = true;
        $scope.loginUser = yield goodidea.User.getLoginUser();
        if ($scope.loginUser && $scope.loginUser.id == queryString['id']) {
            $scope.user = $scope.loginUser;
            $scope.editable = true;
        }
        else {
            $scope.user = yield goodidea.User.getUserById(queryString['id']);
            $scope.editable = false;
        }
        $scope.user.htmlContent = $sce.trustAsHtml(markdown.toHtml($scope.user.information));
        $scope.user.projectList = yield goodidea.Project.getUserProjects($scope.user);
        var nowTime = yield goodidea.getServerDate();
        var timeString = x => {
            var time = nowTime.getTime() - x.lastEditTime;
            console.log(time);
            var day = Math.floor(time / (24 * 3600 * 1000));
            time %= 24 * 3600 * 1000;
            var hours = Math.floor(time / (3600 * 1000));
            time %= 3600 * 1000;
            var minnutes = Math.floor(time / (60 * 1000));
            time %= 60 * 1000;
            var seconds = Math.floor(time / 1000);
            var updateString = "";
            if (day > 0)
                updateString += `${day}天`;
            if (hours > 0 && day == 0)
                updateString += `${hours}時`;
            if (minnutes > 0 && hours == 0)
                updateString += `${minnutes}分`;
            if (seconds > 0 && minnutes == 0)
                updateString += `${seconds}秒`;
            updateString += "前更新";
            if (time < 0)
                updateString = "不久前更新";
            x.timeString = updateString;
        };
        $scope.user.projectList.own.forEach(timeString);
        $scope.user.projectList.participate.forEach(timeString);
        $scope.loading = false;
        $scope.$apply();
        fixMdlTooltip(document.getElementById("Own-Panel"));
        fixMdlTooltip(document.getElementById("Participate-Panel"));
        if (queryString['tab']) {
            var temp = document.querySelector(`[href="#${queryString['tab']}"]`);
            if (temp)
                temp.click();
        }
        console.log($scope.user);
    });
});
//# sourceMappingURL=about.js.map