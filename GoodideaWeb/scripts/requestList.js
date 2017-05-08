var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
app.controller('requestList', function ($scope, $sce, $uibModal) {
    return __awaiter(this, void 0, void 0, function* () {
        $scope.bannerList = yield goodidea.Banner.getBannerList();
        $scope.classOptions = [{ id: 'N', name: '不分類' }];
        $scope.class = 'N';
        (yield goodidea.Class.getClassList()).forEach(x => $scope.classOptions.push(x));
        $scope.keyword = '';
        $scope.loginUser = yield goodidea.User.getLoginUser();
        $scope.loadLoginUserSpecialty = () => __awaiter(this, void 0, void 0, function* () {
            $scope.keyword = $scope.loginUser.specialty.map(x => x.value);
            yield $scope.reload();
            $scope.$apply();
            fixMdlTextfields(document.getElementsByClassName('listController')[0]);
        });
        $scope.orderOptions = [
            { id: goodidea.OrderBy.lastEditTime, name: '最後更新時間' },
            { id: goodidea.OrderBy.name, name: '提案名稱' },
            { id: goodidea.OrderBy.class, name: '提案分類' },
            { id: goodidea.OrderBy.views, name: '瀏覽人次' }
        ];
        $scope.order = goodidea.OrderBy.lastEditTime.toString();
        $scope.$apply(); //通知更新
        $scope.lastPageResult = null;
        $scope.projectList = [];
        $scope.loading = false;
        $scope.loadNextPage = () => __awaiter(this, void 0, void 0, function* () {
            $scope.loading = true;
            if ($scope.lastPageResult == null) {
                $scope.lastPageResult = yield goodidea.Project.getRequestProjectList($scope.keyword, $scope.class == 'N' ? null : $scope.class, parseInt($scope.order));
            }
            else {
                $scope.lastPageResult = yield $scope.lastPageResult.nextPage();
            }
            $scope.lastPageResult.result.forEach(x => {
                if (!x.cover)
                    x.cover = $scope.bannerList[0];
                x.idString = x.id.replace(/\-/g, '');
                if ($scope.projectList.filter(y => y.id == x.id).length == 0)
                    $scope.projectList.push(x);
            });
            $scope.loading = false;
            $scope.$apply(); //通知更新    
            fixMdlTooltip(document.getElementsByClassName('android-content')[0]);
        });
        $scope.reload = () => __awaiter(this, void 0, void 0, function* () {
            $scope.lastPageResult = null;
            $scope.projectList = [];
            yield $scope.loadNextPage();
            $scope.$apply(); //通知更新  
        });
        yield $scope.reload();
        $scope.$apply(); //通知更新  
        fixMdlTextfields(document.getElementsByClassName('listController')[0]);
        //AutoLoadMore
        var mdlContentElement = document.getElementsByClassName('mdl-layout__content')[0];
        $scope.autoload = true; //自動讀取鎖定變數
        mdlContentElement.onscroll = () => __awaiter(this, void 0, void 0, function* () {
            if (mdlContentElement.scrollHeight - mdlContentElement.scrollTop > 1500)
                return; //作用座標
            if (!$scope.autoload)
                return; //鎖定時不處理
            $scope.autoload = false; //鎖定
            yield $scope.loadNextPage(); //讀取
            $scope.autoload = true; //取消鎖定
            $scope.$apply(); //通知更新 
        });
    });
});
//# sourceMappingURL=requestList.js.map