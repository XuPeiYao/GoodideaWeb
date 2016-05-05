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
        $scope.load = () => __awaiter(this, void 0, void 0, function* () {
            $scope.loading = true;
            $scope.project = yield goodidea.Project.getProjectById(queryString['id']);
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