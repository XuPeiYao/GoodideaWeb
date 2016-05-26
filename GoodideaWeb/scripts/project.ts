app.controller('project', async function ($scope, $sce, $uibModal) {
    $scope.project = null;
    $scope.loginUser = null;
    $scope.voteQuota = 0;
    $scope.loading = false;

    //讀取提案
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

        $scope.updateMember();
        
        //產生隱藏STYLE
        if (!$scope.project.setable) {
            $scope.unSetableStyle = {
                'visibility': 'collapse'
            };
        }

        //更新內文HTML
        $scope.updateContent();
    }

    //更新成員名單(成員名單在前端區分為課程成員與團隊成員)
    $scope.updateMember = () => {
        //篩選各類別的團隊成員
        $scope.project.team.member = $scope.project.team.group.filter(x => x.memberType == goodidea.MemberType.member);
        $scope.project.team.assistant = $scope.project.team.group.filter(x => x.memberType == goodidea.MemberType.assistant);
        $scope.project.team.teacher = $scope.project.team.group.filter(x => x.memberType == goodidea.MemberType.teacher);
    }

    //更新內文HTML(當project物件更新後需要更新目前UI)
    $scope.updateContent = () => {
        $scope.project.htmlContent = $sce.trustAsHtml(markdown.toHtml($scope.project.content));
        //#region Segment剖析
        $scope.project.segments = (<goodidea.Project>$scope.project).getContentSegments().segments;
        if ($scope.project.segments) {
            $scope.project.segments = $scope.project.segments.map(x => {
                var element = (<HTMLElement>parseNode(markdown.toHtml(x.title)));
                if (element) return {
                    active: false,
                    text: element.innerText
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
            .toArray().forEach((x: HTMLElement) => {
                x.onload = mdlContentElement.onscroll//當圖片讀取完畢，更新章節座標
            });
        mdlContentElement.onscroll(null);//初始化章節列表
        //#endregion
    }

    //投票
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

    //變更團隊名稱
    $scope.changeTeamName = async () => {
        swal({
            title: "變更團隊名稱",
            text: "請輸入新的團隊名稱",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            inputPlaceholder: "團隊名稱",
            confirmButtonText: "確定",
            cancelButtonText: "取消"
        }, async (inputValue) => {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("團隊名稱不該為空"); return false
            }
            $scope.project.team.name = inputValue;
            $scope.loading = true;
            await $scope.project.update();
            $scope.loading = false;
            swal({
                type: 'success',
                title: "團隊名稱變更成功",
                text: `您已經成功的將本提案團隊名稱變更為「${$scope.project.team.name}」`,
                confirmButtonText: "確定"
            });
            $scope.$apply();
        });
    }

    //提案封面上傳
    $scope.addCover = () => {
        var addDocument = $uibModal.open({
            animation: true,
            templateUrl: 'modals/addCover.html',
            controller: 'addCoverModal',
            size: 'sm',
            resolve: {
                project: () => $scope.project,
                mainScope: () => $scope
            }
        });
        addDocument.rendered.then(() => {
            $scope.loading = false;
            componentHandler.upgradeDom();
        });
    }

    //#region 團隊管理
    $scope.addTeamMember = (isMember: boolean) => {
        var addTeamMember = $uibModal.open({
            animation: true,
            templateUrl: 'modals/addMember.html',
            controller: 'addMemberModal',
            size: 'sm',
            resolve: {
                project: () => $scope.project,
                isMember: () => isMember,
                mainScope: () => $scope
            }
        });
        addTeamMember.rendered.then(() => {
            $scope.loading = false;
            componentHandler.upgradeDom();
        });
        /*addTeamMember.closed.then(() => {//當視窗關閉
            $scope.load();
        });*/
    }
    $scope.removeTeamMember = (member: goodidea.TeamMember) => {   
        swal({
            title: "刪除團隊成員",
            text: `您確定要將此成員「${member.user.name}(${member.user.id})」從本團隊中刪除嗎?`,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, async (isConfirm) => {
            if (isConfirm) {
                $scope.loading = true;
                try {
                    await (<goodidea.Project>$scope.project).removeMember(member);
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
                $scope.loading = false;
                $scope.updateMember();
                $scope.$apply();
                //swal("刪除團隊成員", `您已經將成員「${member.user.name}(${member.user.id})」從本團隊中刪除`, "success");        
            }
        });
    }
    //#endregion

    //#region 團隊需求
    //加入新的徵人需求
    $scope.addRequest = () => {
        var addRequest = $uibModal.open({
            animation: true,
            templateUrl: 'modals/addMemberRequest.html',
            controller: 'addMemberRequestModal',
            size: 'sm',
            resolve: {
                project: () => $scope.project,
                mainScope: () => $scope
            }
        });
        addRequest.rendered.then(() => {
            componentHandler.upgradeDom();
        });
    }

    //編輯徵人需求
    $scope.editRequest = (t: goodidea.MemberRequest) => {
        var editRequest = $uibModal.open({
            animation: true,
            templateUrl: 'modals/editMemberRequest.html',
            controller: 'editMemberRequestModal',
            size: 'sm',
            resolve: {
                project: () => $scope.project,
                mainScope: () => $scope,
                memberRequest: () => t
            }
        });
        editRequest.rendered.then(() => {
            componentHandler.upgradeDom();
        });
    }

    //移除徵人需求
    $scope.removeRequest = async (t: goodidea.MemberRequest) => {
        swal({
            title: "刪除成員需求",
            text: `您確定要將此成員需求刪除嗎?`,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, async (isConfirm) => {
            if (isConfirm) {
                $scope.loading = true;
                try {
                    await (<goodidea.Project>$scope.project).removeMemberRequest(t);
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
                $scope.loading = false;
                $scope.$apply();
            }
        });
    }

    //應徵
    $scope.joinRequest = async (t: goodidea.MemberRequest) => {
        $scope.loading = true;
        await t.joinMemberRequest();
        $scope.loading = false;
        $scope.$apply();
    }

    //取消應徵
    $scope.quitRequest = async (t: goodidea.MemberRequest) => {
        $scope.loading = true;
        await t.quitMemberRequest();
        $scope.loading = false;
        $scope.$apply();
    }

    //將指定人從應徵清單中移除
    $scope.removeResponse = () => {
        
    }

    //顯示應徵清單
    $scope.openResponseList = (t: goodidea.MemberRequest) => {
        var openResponse = $uibModal.open({
            animation: true,
            templateUrl: 'modals/memberRequestResponse.html',
            controller: 'memberRequestResponseModal',
            size: 'sm',
            resolve: {
                project: () => $scope.project,
                mainScope: () => $scope,
                memberRequest: () => t
            }
        });
        openResponse .rendered.then(() => {
            componentHandler.upgradeDom();
        });
    }
    //#endregion

    //#region 文件管理
    $scope.addDocument = () => {
        var addDocument = $uibModal.open({
            animation: true,
            templateUrl: 'modals/addDocument.html',
            controller: 'addDocumentModal',
            size: 'sm',
            resolve: {
                project: () => $scope.project,
                mainScope: () => $scope
            }
        });
        addDocument.rendered.then(() => {
            $scope.loading = false;
            componentHandler.upgradeDom();
        });
    }
    $scope.removeDocument = async (t: goodidea.DocumentInfo) => {
        swal({
            title: "刪除文件",
            text: `您確定要將文件「${t.name || t.file.name}」從本提案中刪除嗎?請注意，請確保文章中並無使用到該檔案，否則刪除後可能發生找不到目標檔案問題`,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, async (isConfirm) => {
            if (isConfirm) {
                $scope.loading = true;
                try {
                    await (<goodidea.Project>$scope.project).deleteFile(t);
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
                $scope.loading = false;
                $scope.$apply();
            }
        });
    }
    //#endregion

    //#region 討論區
    //討論區類型字串
    $scope.forumsType = null;

    //發表討論
    $scope.addForum = () => {
        swal({
            title: "發表討論",
            text: "請輸入討論內容",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            inputPlaceholder: "討論內容",
            confirmButtonText: "確定",
            cancelButtonText: "取消"
        }, async (inputValue) => {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("討論內容不該為空"); return false
            }
            $scope.loading = true;
            await goodidea.Forum.createForum($scope.project, ($scope.forumsType == "Private"), <string>inputValue);
            $scope.loading = false;
            swal({
                type: 'success',
                title: "發表討論成功",
                text: '您已經成功發表討論',
                confirmButtonText: "確定"
            });
            $scope.forumTypeChange();
            $scope.$apply();
        });
    }

    //移除討論
    $scope.removeForum = async (forum: goodidea.Forum) => {
        swal({
            title: "刪除討論",
            text: `您確定要將此討論刪除嗎?`,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, async (isConfirm) => {
            if (isConfirm) {
                $scope.loading = true;
                try {
                    await goodidea.Forum.remove(forum);
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
                $scope.loading = false;
                $scope.forumTypeChange();
            }
        });
    }

    //當討論需類型改變
    $scope.forumTypeChange = () => {
        $scope.forumList = null;
        $scope.forum = [];
        $scope.forumNextPage();   
    }

    //討論區討論串
    $scope.forum = [];

    //讀取更多討論
    $scope.forumNextPage = async () => {
        if ($scope.forumList) {
            $scope.forumList = await (<goodidea.PageResult<goodidea.Forum>>$scope.forumList).nextPage();
        } else {
            $scope.forumList = await goodidea.Forum.getForumList($scope.project,  $scope.forumsType == "Private");
        }
        $scope.forum = $scope.forum.concat($scope.forumList.result);
        $scope.$apply();
        fixMdlTooltip(document.getElementById("forumList"));
    }
    //#endregion

    await $scope.load();//初始化頁面
    await $scope.forumNextPage();//讀取討論區
    $scope.$apply();
});
app.controller('addDocumentModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, project: goodidea.Project, mainScope, $uibModal) {
    $scope.name = "";
    $scope.upload = async() => {
        var files = (<HTMLInputElement>document.getElementById("AddDocument_FileInput")).files;
        if (files.length == 0) {
            swal({
                type: 'error',
                title: "資料缺漏",
                text: "請務必選擇上傳檔案",
                confirmButtonText: "確定"
            });
            return;
        }
        swal({
            title: "檔案上傳中",
            text: "正在上傳您的檔案，上傳完成後本視窗將自動關閉",
            showConfirmButton: false
        });
        $scope.loading = true;
        try {
            await project.uploadFile($scope.name, files[0]);
            swal.close();
            mainScope.$apply();
            $scope.cancel();
        } catch (e) {
            swal({
                type: 'error',
                title: e.name,
                text: e.message,
                confirmButtonText: "確定"
            });
            $scope.loading = false;
            $scope.$apply();
            return;
        }
    }
    $scope.cancel = () => $uibModalInstance.close();
});

app.controller('addMemberRequestModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, project: goodidea.Project, mainScope, $uibModal) {
    $scope.specialtyList = ["設計", "外語", "財管", "行銷", "資訊"];//預設專長限制
    $scope.specialtySelect = $scope.specialtyList.first();//預設選取項目
    $scope.specialty = [];
    $scope.isTeacher = false;
    $scope.addSpecialty = () => {
        var value = $scope.specialtySelect == '' ? $scope.specialtyInput : $scope.specialtySelect;
        if ($scope.specialty.filter(x => x == value).length) return;
        $scope.specialty.push(value);
    }
    $scope.removeSpecialty = (t)=>{
        $scope.specialty = $scope.specialty.filter(x => x != t);
    }
    $scope.addMemberRequest = async () => {
        try {
            $scope.loading = true;
            var spec = $scope.specialty.length ? $scope.specialty : null;
            await (<goodidea.Project>project).addMemberRequest($scope.isTeacher, spec);
            $scope.loading = false;
            mainScope.$apply();
            $scope.cancel();
        }catch (e) {
            swal({
                type: 'error',
                title: e.name,
                text: e.message,
                confirmButtonText: "確定"
            });
            $scope.loading = false;
            mainScope.$apply();
            return;
        }
    }
    $scope.cancel = () => $uibModalInstance.close();
});

app.controller('editMemberRequestModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, project: goodidea.Project, memberRequest: goodidea.MemberRequest, mainScope, $uibModal) {
    $scope.specialtyList = ["設計", "外語", "財管", "行銷", "資訊"];//預設專長限制
    $scope.specialtySelect = $scope.specialtyList.first();//預設選取項目
    $scope.specialty = memberRequest.specialty;
    $scope.isTeacher = memberRequest.isTeacher;
    $scope.addSpecialty = async () => {
        var value = $scope.specialtySelect == '' ? $scope.specialtyInput : $scope.specialtySelect;
        if ($scope.specialty.filter(x => x.value == value).length) return;
        await memberRequest.addSpecialty(value);
        
        $scope.$apply();
        mainScope.$apply();
    }
    $scope.removeSpecialty = async (t: goodidea.MemberRequestSpecialty) => {
        await memberRequest.removeSpecialty(t);
        $scope.specialty = $scope.specialty.filter(x => x.id != t.id);
        $scope.$apply();
        mainScope.$apply();
    }
    $scope.addMemberRequest = async () => {
        try {
            $scope.loading = true;
            var spec = $scope.specialty.length ? $scope.specialty : null;
            await (<goodidea.Project>project).addMemberRequest($scope.isTeacher, spec);
            $scope.loading = false;
            mainScope.$apply();
            $scope.cancel();
        } catch (e) {
            swal({
                type: 'error',
                title: e.name,
                text: e.message,
                confirmButtonText: "確定"
            });
            $scope.loading = false;
            mainScope.$apply();
            return;
        }
    }
    $scope.cancel = () => $uibModalInstance.close();
});

app.controller('memberRequestResponseModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, project: goodidea.Project, memberRequest: goodidea.MemberRequest, mainScope, $uibModal) {
    $scope.loading = true;
    $scope.users = await memberRequest.getMemberResponseList();

    if ($scope.users.length) {
        $scope.user = $scope.users.first().id;       
    }
    $scope.loading = false;
    $scope.$apply();


    $scope.openUserPage = () => {
        window.open(`about.html?id=${$scope.user}`);
    }
    $scope.addMember = async () => {
        if (project.team.group.filter(x => x.user.id == $scope.user).length) {
            swal({
                type: 'error',
                title: '重複成員',
                text: '您選擇的應徵者已經加入團隊中',
                confirmButtonText: "確定"
            });
            return;
        }
        swal({
            title: "新增團隊成員",
            text: `您確定要將「${$scope.users.filter(x => x.id == $scope.user)[0].name}(${$scope.user})」加入團隊嗎?`,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, async (isConfirm) => {
            if (isConfirm) {
                $scope.loading = true;

                await project.addMember($scope.user, memberRequest.isTeacher ? goodidea.MemberType.teacher : goodidea.MemberType.member);
                await memberRequest.removeMemberResponse($scope.user);

                $scope.loading = false;
                $scope.$apply();
                mainScope.updateMember();
                mainScope.$apply();
                $scope.cancel();
            }
        });
    }
    $scope.cancel = () => $uibModalInstance.close();
});

app.controller('addCoverModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, project: goodidea.Project, mainScope, $uibModal) {
    $scope.upload = async () => {
        var files = (<HTMLInputElement>document.getElementById("AddCover_FileInput")).files;
        if (files.length == 0) {
            swal({
                type: 'error',
                title: "資料缺漏",
                text: "請務必選擇上傳檔案",
                confirmButtonText: "確定"
            });
            return;
        }
        swal({
            title: "檔案上傳中",
            text: "正在上傳您的檔案，上傳完成後本視窗將自動關閉",
            showConfirmButton: false
        });
        $scope.loading = true;
        try {
            await project.uploadCover(files[0]);
            swal.close();
            mainScope.$apply();
            $scope.cancel();
        } catch (e) {
            swal({
                type: 'error',
                title: e.name,
                text: e.message,
                confirmButtonText: "確定"
            });
            $scope.loading = false;
            $scope.$apply();
            return;
        }
    }
    $scope.cancel = () => $uibModalInstance.close();
});

app.controller('addMemberModal', async function ($scope, $sce, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, project, isMember: boolean, mainScope, $uibModal) {
    $scope.isMember = isMember;
    $scope.isTeacher = true;
    if (isMember) {
        $scope.typeName = "一般隊員";
    } else {
        $scope.typeName = "課程成員";
    }

    $scope.idChange = () => {//自動補足信箱
        if (!$scope.id || !$scope.id.length) return;
        var index = $scope.id.indexOf('@');
        if (index != $scope.id.length - 1) return;
        $scope.id += "nkfust.edu.tw";
    }

    $scope.addMember = async () => {
        $scope.loading = true;
        if (!$scope.id || !$scope.id.length) {
            swal({
                type: 'error',
                title: "無效的使用者信箱",
                text: "使用者信箱不能為空",
                confirmButtonText: "確定"
            });
            $scope.loading = false;
            return;
        }

        $scope.memberType = null;
        if ($scope.isMember) {
            $scope.memberType = goodidea.MemberType.member;
        } else if ($scope.isTeacher) {
            $scope.memberType = goodidea.MemberType.teacher
        } else {
            $scope.memberType = goodidea.MemberType.assistant;
        }

        console.log($scope.memberType)

        try {
            await (<goodidea.Project>project).addMember(
                $scope.id, $scope.memberType );
            mainScope.updateMember();
            mainScope.$apply();
            $scope.cancel();
        } catch (e) {
            swal({
                type: 'error',
                title: e.name,
                text: e.message,
                confirmButtonText: "確定"
            });
        }
        $scope.loading = false;
    }
    $scope.cancel = () => $uibModalInstance.close();
});