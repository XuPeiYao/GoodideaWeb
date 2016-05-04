app.controller('projectList', async function ($scope, $sce, $uibModal) {
    $scope.classOptions = [{ id: 'N', name: '不分類' }];
    $scope.class = 'N';
    (await goodidea.Class.getClassList()).forEach(x => $scope.classOptions.push(x));

    $scope.competitionOptions = [{ id: 'N', name: '不限定' }];
    $scope.competition = 'N';
    (await goodidea.Competition.getCompetitionList(null, null)).forEach(x => $scope.competitionOptions.push(x));

    $scope.orderOptions = [
        { id: goodidea.OrderBy.lastEditTime, name: '最後更新時間' },
        { id: goodidea.OrderBy.name, name: '提案名稱' },
        { id: goodidea.OrderBy.class, name: '提案分類' },
        { id: goodidea.OrderBy.views, name: '瀏覽人次' },
        { id: goodidea.OrderBy.votes, name: '得票數' },
        { id: goodidea.OrderBy.awardsFirst, name: '獲獎者在前' }
    ];
    $scope.order = goodidea.OrderBy.lastEditTime.toString();
    $scope.$apply();//通知更新

    $scope.lastPageResult = null;
    $scope.projectList = [];
    $scope.loadNextPage = async () => {
        if ($scope.lastPageResult == null) {
            $scope.lastPageResult = await goodidea.Project.getProjectList(
                $scope.class == 'N'? null : $scope.class,
                $scope.competition == 'N' ? null : $scope.competition,
                parseInt($scope.order)
            );
        } else {
            $scope.lastPageResult = await $scope.lastPageResult.nextPage();
        }
        
        $scope.lastPageResult.result.forEach(x => $scope.projectList.push(x));

        $scope.$apply();//通知更新    
    }
    $scope.reload =async () => {
        $scope.lastPageResult = null;
        $scope.projectList = [];
        await $scope.loadNextPage();
        $scope.$apply();//通知更新  
    }
    await $scope.reload();
    $scope.$apply();//通知更新  
});
