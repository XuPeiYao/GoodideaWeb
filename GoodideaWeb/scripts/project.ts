app.controller('project', async function ($scope, $sce, $uibModal) {
    $scope.project = null;
    $scope.loginUser = null;
    $scope.voteQuota = 0;
    $scope.loading = false;
    $scope.load = async () => {
        $scope.loading = true;
        $scope.projectId = queryString['id'];
        try {
            $scope.loginUser = await goodidea.User.getLoginUser();//取得目前登入使用者
            $scope.project = await goodidea.Project.getProjectById($scope.projectId);//透過Querystring取得ID後讀取該提案
            if ($scope.loginUser && $scope.project.competition) {
                $scope.voteQuota = await goodidea.Competition.getLoginUserQuota($scope.project.competition);//取得剩餘可投票數
            }
            if (!$scope.loginUser) $scope.voteQuota = "0，您尚未登入";
        } catch (e) {
            swal({
                type: 'error',
                title: "無效的提案ID",
                text: "您目前的檢視頁面連結是無效的，這可能是因為該提案並未公開且您目前的身分無法檢視(或登入逾時)或已經刪除",
                confirmButtonText: "確定"
            });
            return;
        }
        $scope.$apply();
        
        if (!$scope.project.cover) $scope.project.cover = (await goodidea.Banner.getBannerList())[0]
        console.log($scope.project)
        $scope.loading = false;
        $scope.project.htmlContent = $sce.trustAsHtml(markdown.toHtml($scope.project.content));
        
        $scope.project.segments = (<goodidea.Project>$scope.project).getContentSegments().segments;
        if ($scope.project.segments) {
            $scope.project.segments = $scope.project.segments.map(x => {
                var element = (<HTMLElement>parseNode(markdown.toHtml(x.title)));
                if (element) return element.innerText;
            });
        }
        
        $scope.$apply();//通知更新

        var contentElement = document.getElementsByClassName("nkfust-project-content")[0];
        for (var i = 1; i <= 6; i++) {
            contentElement.getElementsByTagName('h' + i.toString()).toArray().forEach((x: HTMLElement) => {
                var aTag = document.createElement('a');
                aTag.name = x.innerText;
                contentElement.insertBefore(aTag, x);
            });
        }
        //console.log(document.getElementsByTagName("h3"));
    } 
    $scope.vote = async () => {
        $scope.loading = true;
        try {
            $scope.voteQuota = (await $scope.project.vote());
        } catch (e) {
            $scope.loading = false;
            swal({
                type: 'error',
                title: e.name,
                text: e.message,
                confirmButtonText: "確定"
            });
            return;
        }
        await $scope.load();//更新提案資訊
        $scope.loading = false;
        $scope.$apply();
        swal({
            type: 'success',
            title: "投票成功",
            text: `您已經成功的在競賽「${$scope.project.competition.name}」中針對此提案「${$scope.project.name}」進行投票`,
            confirmButtonText: "確定"
        });
    }
    await $scope.load();
    
    $scope.$apply();
});