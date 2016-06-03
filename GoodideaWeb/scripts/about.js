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
        $scope.loading = false;
        $scope.$apply();
        console.log($scope.user);
    });
});
//# sourceMappingURL=about.js.map