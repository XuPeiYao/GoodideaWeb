var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
app.controller('competitionList', function ($scope, $sce, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        $scope.bannerList = yield goodidea.Banner.getBannerList();
        $scope.load = () => __awaiter(this, void 0, void 0, function* () {
            $scope.competitionList = yield goodidea.Competition.getCompetitionList($scope.active, $scope.vote);
            $scope.competitionList.forEach(x => {
                x.idString = x.id.replace(/\-/g, '');
                x.cover = $scope.bannerList.first();
            });
            $scope.$apply();
            fixMdlTooltip(document.getElementsByClassName('android-content')[0]);
        });
        $scope.load();
    });
});
//# sourceMappingURL=competitionList.js.map