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
        
        //#region 篩選各類別的團隊成員
        $scope.project.team.member = $scope.project.team.group.filter(x => x.memberType == goodidea.MemberType.member);
        $scope.project.team.assistant = $scope.project.team.group.filter(x => x.memberType == goodidea.MemberType.assistant);
        $scope.project.team.teacher = $scope.project.team.group.filter(x => x.memberType == goodidea.MemberType.teacher);

        //產生隱藏STYLE
        if (!$scope.project.setable) {
            $scope.unSetableStyle = {
                'visibility': 'collapse'
            };
        }

        //#endregion

        //#region Segment剖析
        $scope.project.segments = (<goodidea.Project>$scope.project).getContentSegments().segments;
        if ($scope.project.segments) {
            $scope.project.segments = $scope.project.segments.map(x => {
                var element = (<HTMLElement>parseNode(markdown.toHtml(x.title)));
                if (element) return {
                    active: false,
                    text : element.innerText
                }
            });
        }
        
        $scope.$apply();//通知更新
        fixMdlTooltip(document.getElementsByClassName('android-content')[0]);//修復UI中的MDL說明文字效果
        fixMdlButton(document.getElementsByClassName('android-more-section')[0]);//修復UI中的MDL按鈕效果

        //取得Markdown主要內容區塊
        var contentElement = document.getElementsByClassName("nkfust-project-content")[0];
        $scope.tags = [];//標籤集合
        for (var i = 1; i <= 6; i++) {//產生頁面標籤
            contentElement.getElementsByTagName('h' + i.toString()).toArray().forEach((x: HTMLElement) => {
                var aTag = document.createElement('a');
                aTag.name = x.innerText;
                $scope.tags.push(aTag);//加入標籤集合
                contentElement.insertBefore(aTag, x);
            });
        }

        //取得頁面主要區塊
        var mdlContentElement: HTMLDivElement = <HTMLDivElement>(document.getElementsByClassName('mdl-layout__content')[0]);
        mdlContentElement.onscroll = function () {//當使用者滾動畫面調整章節列表作用表示
            //#region 更新Segment座標資訊
            for (var i = 0; i < $scope.project.segments.length; i++) {
                if (!$scope.project.segments[i]) continue;
                var text = $scope.project.segments[i].text;
                var element = contentElement.querySelector(`a[name="${text}"]`);
                if (!element) continue;
                $scope.project.segments[i].element = element;
                $scope.project.segments[i].start = element.getBoundingClientRect().top + mdlContentElement.scrollTop;
            }
            for (var i = 0; i < $scope.project.segments.length; i++) {
                if (!$scope.project.segments[i]) continue;
                if (i == $scope.project.segments.length - 1) {
                    $scope.project.segments[i].end = Number.MAX_SAFE_INTEGER;
                    continue;
                }
                $scope.project.segments[i].end = $scope.project.segments[i + 1].start;
            }
            //#endregion

            var visableStart = this.scrollTop;
            var visableEnd = this.scrollTop + document.body.clientHeight;
            for (var i = 0; i < $scope.project.segments.length; i++) {
                if (!$scope.project.segments[i]) continue;
                var segment = $scope.project.segments[i];
                if (segment.start <= visableStart && segment.end >= visableEnd) segment.active = true;
                else if (segment.start >= visableStart && segment.start <= visableEnd) segment.active = true;
                else if (segment.end >= visableEnd && segment.end <= visableEnd) segment.active = true;
                else if (segment.start >= visableStart && segment.end <= visableEnd) segment.active = true;                
                else segment.active = false;
            }
            $scope.$apply();
        };
        contentElement.getElementsByTagName("img")
            .toArray().forEach((x:HTMLElement) => {
                x.onload = mdlContentElement.onscroll//當圖片讀取完畢，更新章節座標
            });
        mdlContentElement.onscroll(null);//初始化章節列表
        //#endregion
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
    await $scope.load();//初始化頁面
    
    $scope.$apply();
});