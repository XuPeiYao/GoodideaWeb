﻿app.controller('about', async function ($scope, $sce, $uibModal) {
    $scope.loading = true;
    $scope.loginUser = await goodidea.User.getLoginUser();
    if ($scope.loginUser && $scope.loginUser.id == queryString['id']) {
        $scope.user = $scope.loginUser;
        $scope.editable = true;
    } else {
        $scope.user = await goodidea.User.getUserById(queryString['id']);
        $scope.editable = false;
    }

    initAboutEditor("#editor", $scope);

    $scope.editInformation=() => {
        $scope.editing = true;
    };
    $scope.back = () => {
        $scope.editing = false;
    };

    $scope.loadInformation = () => {
        $scope.user.htmlContent = $sce.trustAsHtml(markdown.toHtml($scope.user.information));
    }
    $scope.loadInformation();
    $scope.loadProjectList = async () => {
        $scope.user.projectList = await goodidea.Project.getUserProjects(<goodidea.User>$scope.user);
        var nowTime = await goodidea.getServerDate();

        var timeString = x => {
            var time = nowTime.getTime() - x.lastEditTime;
            console.log(time);

            var year = Math.floor(time / (365 * 24 * 3600 * 1000));
            time %= 365 * 24 * 3600 * 1000;

            var day = Math.floor(time / (24 * 3600 * 1000));
            time %= 24 * 3600 * 1000;

            var hours = Math.floor(time / (3600 * 1000));
            time %= 3600 * 1000;

            var minnutes = Math.floor(time / (60 * 1000));
            time %= 60 * 1000;

            var seconds = Math.floor(time / 1000);



            var updateString = "";
            if (year > 0) updateString += `${year}年`;
            if (day > 0) updateString += `${day}天`;
            if (hours > 0 && day == 0) updateString += `${hours}時`;
            if (minnutes > 0 && hours == 0) updateString += `${minnutes}分`;
            if (seconds > 0 && minnutes == 0) updateString += `${seconds}秒`;
            updateString += "前更新";
            if (time < 0) {
                updateString = "不久前更新";
            } else if (day == 0 && minnutes == 0 && seconds == 0) {
                updateString = "不久前更新";
            }
            
            x.timeString = updateString;
        };
        $scope.user.projectList.own.forEach(timeString);
        $scope.user.projectList.participate.forEach(timeString);
    }
    
    await $scope.loadProjectList();

    $scope.loading = false;
    $scope.$apply();
    fixMdlTooltip(document.getElementById("Own-Panel"));
    fixMdlTooltip(document.getElementById("Participate-Panel"));
    if (queryString['tab']) {
        var temp = <HTMLElement>document.querySelector(`[href="#${queryString['tab']}"]`);
        if (temp) temp.click();
    }

    $scope.addProject = () => {
        $uibModal.open({
            animation: true,
            templateUrl: 'modals/addProject.html',
            controller: 'addProjectModal',
            size: 'sm',
            resolve: {
                mainScope: () => $scope
            }
        }).rendered.then(() => {
            $scope.loading = false;
            componentHandler.upgradeDom();
        });
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


    $scope.editor = {};
    $scope.editor.addUrl = () => {
        var addUrl = $uibModal.open({
            animation: true,
            templateUrl: 'modals/editorAddUrl.html',
            controller: 'editorAddUrlModal',
            size: 'sm',
            resolve: {
                project: () => $scope.project,
                mainScope: () => $scope
            }
        });
        addUrl.rendered.then(() => {
            $scope.loading = false;
            componentHandler.upgradeDom();
        });
    }
});

app.controller('editAboutModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, $uibModal,mainScope) {
    $scope.loading = true;
    $scope.name = mainScope.user.name;
    $scope.email = mainScope.user.email;
    $scope.phone = mainScope.user.phone;
    $scope.specialty = mainScope.user.specialty;

    $scope.specialtyList = ["設計", "外語", "財管", "行銷", "資訊"];//預設專長限制
    $scope.specialtySelect = $scope.specialtyList.first();//預設選取項目

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
    $scope.addSpecialty = async () => {
        var value = $scope.specialtySelect == '' ? $scope.specialtyInput : $scope.specialtySelect;
        if ($scope.specialty.filter(x => x.value == value).length) return;
        $scope.loading = true;
        await (<goodidea.User>mainScope.user).addSpecialty(value);
        $scope.specialty = mainScope.user.specialty;
        $scope.loading = false;
        $scope.$apply();
        mainScope.$apply();
    } 
    $scope.removeSpecialty = async (t) => {
        $scope.loading = true;
        await (<goodidea.User>mainScope.user).removeSpecialty(t);
        $scope.specialty = mainScope.user.specialty;
        $scope.loading = false;
        $scope.$apply();
        mainScope.$apply();
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

app.controller('addProjectModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, $uibModal, mainScope) {
    $scope.name = "";
    $scope.classList = await goodidea.Class.getClassList();
    $scope.class = $scope.classList.first().id;
    $scope.competitionList = [{ id: 'N', name: '未設定' }];
    $scope.competition = 'N';
    var competitionList = await goodidea.Competition.getCompetitionList(true, false);
    for (var i = 0; i < competitionList.length; i++) {
        $scope.competitionList.push(competitionList[i]);
    }
    $scope.ok = async () => {
        if (!$scope.name && $scope.name.length == 0) {
            swal({
                type: 'error',
                title: "資料缺漏",
                text: "請輸入提案名稱",
                confirmButtonText: "確定"
            });
            return;
        }
        $scope.loading = true;
        var project = await goodidea.Project.create($scope.name, $scope.class, $scope.competition == 'N' ? null : $scope.competition);
        await mainScope.loadProjectList();
        $scope.loading = false;
        $scope.$apply();

        swal({
            title: "進入編輯",
            text: `您的提案已經建立完成，是否立刻導引至該提案`,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
        }, async (isConfirm) => {
            if (!isConfirm) return;
            $scope.loading = true;
            location.href = "project.html?id=" + project.id;
            $scope.loading = false;
        });

        $scope.cancel();
    }
    $scope.cancel = () => $uibModalInstance.close();
});


//編輯器插入連結控制器
app.controller('editorAddUrlModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, project: goodidea.Project, mainScope, $uibModal) {
    $scope.ok = () => {
        if (!$scope.url) {
            swal({
                type: 'error',
                title: "連結網址不該為空",
                text: "您尚未輸入連結網址，或者您輸入的格式錯誤",
                confirmButtonText: "確定"
            });
            return;
        }
        if (!$scope.name || $scope.name.length == 0) $scope.name = $scope.url;

        var aHtml = <HTMLElement>parseNode(markdown.toHtml(`[${$scope.name}](${$scope.url})`)).firstChild;
        tinyMCE.activeEditor.insertContent(aHtml.outerHTML);
        $scope.cancel();
    }
    $scope.cancel = () => $uibModalInstance.close();
});
