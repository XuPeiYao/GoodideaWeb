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
    var nowTime = await goodidea.getServerDate();
    
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
        if (day > 0) updateString += `${day}天`;
        if (hours > 0 && day == 0) updateString += `${hours}時`;
        if (minnutes > 0 && hours == 0) updateString += `${minnutes}分`;
        if (seconds > 0 && minnutes == 0) updateString += `${seconds}秒`;
        updateString += "前更新";
        if (time < 0) updateString = "不久前更新";
        x.timeString = updateString;
    };
    $scope.user.projectList.own.forEach(timeString);
    $scope.user.projectList.participate.forEach(timeString);
    $scope.loading = false;
    $scope.$apply();
    fixMdlTooltip(document.getElementById("Own-Panel"));
    fixMdlTooltip(document.getElementById("Participate-Panel"));
    if (queryString['tab']) {
        var temp = <HTMLElement>document.querySelector(`[href="#${queryString['tab']}"]`);
        if (temp) temp.click();
    }

    $scope.edit = () => {
        $uibModal.open({
            animation: true,
            templateUrl: 'modals/editAbout.html',
            controller: 'editAboutModal',
            size: 'sm',
            resolve: {
                mainScope : ()=>$scope
            }
        }).rendered.then(() => {
            $scope.loading = false;
            componentHandler.upgradeDom();
        });
    }

    $scope.connectFB = () => {
        FB.login(async function (response) {
            if (response.authResponse) {
                console.log('Facebook登入成功');

                $scope.loading = true;
                swal({
                    title: "帳號串聯中",
                    text: "系統正在串聯您的帳號，成功後本視窗自動關閉",
                    showConfirmButton: false
                });

                try {
                    await (<goodidea.User>$scope.user).connectFB(response.authResponse.accessToken);
                    $scope.loading = false;
                    $scope.$apply();//通知更新
                    location.reload();
                } catch (e) {//登入失敗
                    swal({
                        type: 'error',
                        title: e.name,
                        text: e.message,
                        confirmButtonText: "確定"
                    }, (value) => {
                        $scope.loading = false;
                        $scope.$apply();//通知更新
                    });
                }
            } else {
                console.log('使用者取消Facebook登入');
            }
        }, {
                scope: 'public_profile'
        });
    };
    $scope.unconnectFB = async () => {
        swal({
            title: "帳號串聯變更中",
            text: "系統正在變更您的帳號串聯狀態，成功後本視窗自動關閉",
            showConfirmButton: false
        });
        try {
            await $scope.user.unconnectFB();
        } catch (e) { }
        swal.close();
        $scope.$apply();
    }
});

app.controller('editAboutModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, $uibModal,mainScope) {
    $scope.loading = true;
    $scope.name = mainScope.user.name;
    $scope.email = mainScope.user.email;
    $scope.phone = mainScope.user.phone;

    $scope.collegeList = await goodidea.College.getCollegeList();
    //$scope.department = $scope.collegeList.first().departments.first().id;
    if (mainScope.user.department) {
        $scope.department = mainScope.user.department.id;
    }
    console.log($scope.collegeList)
    $scope.loading = false;

    $scope.$apply();
    $scope.ok = async() => {
        $scope.loading = true;

        mainScope.user.name = $scope.name;
        mainScope.user.email = $scope.email;
        mainScope.user.phone = $scope.phone;
        if (!mainScope.user.department) mainScope.user.department = {};
        mainScope.user.department.id = $scope.department;
        await mainScope.user.updateWithoutInformation();
        await mainScope.user.load();
        mainScope.$apply();
        
        $scope.loading = false;

        $scope.cancel();
    }
    $scope.uploadPhoto = () => {
        $uibModal.open({
            animation: true,
            templateUrl: 'modals/uploadPhoto.html',
            controller: 'uploadPhotoModal',
            size: 'sm',
            resolve: {
                mainScope: () => $scope,
                rootScope: () => mainScope
            }
        }).rendered.then(() => {
            $scope.loading = false;
            componentHandler.upgradeDom();
        });
    }
    $scope.cancel = () => $uibModalInstance.close();
});
app.controller('uploadPhotoModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, $uibModal, mainScope,rootScope) {   
    $scope.upload = async () => {
        var file : any = (<HTMLInputElement>document.getElementById("Photo_FileInput")).files;
        if (file == null || file.length == 0) {
            swal({
                type: 'error',
                title: "資料缺漏",
                text: "請務必選擇上傳檔案",
                confirmButtonText: "確定"
            });
            return;
        }
        file = file[0];
        $scope.loading = true;
        await (<goodidea.User>rootScope.user).uploadPhoto(file);
        rootScope.$apply();
        $scope.cancel();
    }
    $scope.cancel = () => $uibModalInstance.close();
});