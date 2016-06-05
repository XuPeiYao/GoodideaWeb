app.controller('competitionList', async function ($scope, $sce, $uibModal) {
    $scope.bannerList = await goodidea.Banner.getBannerList();
    $scope.active = true;
    $scope.load = async () => {
        $scope.competitionList = await goodidea.Competition.getCompetitionList($scope.active, $scope.vote);
        $scope.competitionList.forEach(x => {
            x.idString = x.id.replace(/\-/g, '');
            x.cover = $scope.bannerList.first();
        });
        $scope.$apply();
        fixMdlTooltip(document.getElementsByClassName('android-content')[0]);
    }
    $scope.load();
});
