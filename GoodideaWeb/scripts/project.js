var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
app.controller('project', function ($scope, $sce, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        $scope.project = null;
        $scope.loginUser = null;
        $scope.voteQuota = 0;
        $scope.load = () => __awaiter(this, void 0, void 0, function* () {
            $scope.loading = true;
            $scope.projectId = queryString['id'];
            try {
                $scope.loginUser = yield goodidea.User.getLoginUser();
                $scope.project = yield goodidea.Project.getProjectById($scope.projectId);
                if ($scope.loginUser && $scope.project.competition) {
                    $scope.voteQuota = yield goodidea.Competition.getLoginUserQuota($scope.project.competition);
                }
            }
            catch (e) {
                swal({
                    type: 'error',
                    title: "無效的提案ID",
                    text: "您目前的檢視頁面連結是無效的，這可能是因為該提案並未公開且您目前的身分無法檢視(或登入逾時)或已經刪除",
                    confirmButtonText: "確定"
                });
                return;
            }
            $scope.$apply();
            if (!$scope.project.cover)
                $scope.project.cover = (yield goodidea.Banner.getBannerList())[0];
            console.log($scope.project);
            $scope.loading = false;
            $scope.$apply(); //通知更新
        });
        yield $scope.load();
        $scope.$apply();
    });
});
//# sourceMappingURL=project.js.map