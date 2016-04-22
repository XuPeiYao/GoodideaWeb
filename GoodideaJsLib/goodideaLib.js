var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var goodidea;
(function (goodidea) {
    class Class {
    }
    goodidea.Class = Class;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class FileInfo {
    }
    goodidea.FileInfo = FileInfo;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Project {
    }
    goodidea.Project = Project;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    goodidea.host = "http://goodidea.nkfust.edu.tw/";
    function postAsync(url, header, data, user, password, progressCallback) {
        return __awaiter(this, void 0, Promise, function* () {
            var request = new nativeExtensions.HttpClient();
            if (!data)
                data = {};
            data['origin'] = goodidea.host;
            var response = JSON.parse((yield request.postAsync(url, header, data, user, password, progressCallback)).resultText);
            if (!response.Success)
                throw response.Result;
            return response;
        });
    }
    goodidea.postAsync = postAsync;
    function login(id, password) {
        return __awaiter(this, void 0, Promise, function* () {
            var apiPath = "api/user/login";
            var postData = {
                id: id,
                pwd: password
            };
            if (!password) {
                apiPath = "api/user/fblogin";
                postData = {
                    token: id
                };
            }
            var responseJSON = yield postAsync(apiPath, null, postData);
            return yield getUserById(responseJSON['Result'].Id);
        });
    }
    goodidea.login = login;
    /**
     * 登出系統
     */
    function logout() {
        return __awaiter(this, void 0, Promise, function* () {
            yield postAsync('api/user/logout');
        });
    }
    goodidea.logout = logout;
    /**
     * 取得目前登入使用者資訊
     */
    function getLoginUser() {
        return __awaiter(this, void 0, Promise, function* () {
            var response = yield postAsync('api/user/checklogin');
            if (response['Result'] == null)
                return null;
            return yield getUserById(response['Result'].Id);
        });
    }
    goodidea.getLoginUser = getLoginUser;
    //#endregion
    /**
     * 取得指定使用者相關資訊
     */
    function getUserById(id) {
        return __awaiter(this, void 0, Promise, function* () {
            var result = new User();
            result._id = id;
            yield result.load();
            return result;
        });
    }
    goodidea.getUserById = getUserById;
    class User {
        /**
         * 取得使用者id
         */
        get id() {
            return this._id;
        }
        /**
         * 取得使用者照片
         */
        get photo() {
            return this._photo;
        }
        //#region 資料更新
        /**
         * 讀取使用者資料
         */
        load() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield postAsync('api/user/about', null, {
                    id: this.id
                });
                var fields = ['Name', 'StudentId', 'Phone', 'Information'];
                for (var i = 0; i < fields.length; i++) {
                    this[fields[i].toLowerCase()] = responseJSON['Result'][fields[i]];
                }
            });
        }
        /**
         * 建立新的提案
         * @param name 提案名稱
         * @param _class 提案類別
         */
        createProject(name, _class) {
            return __awaiter(this, void 0, Promise, function* () {
                return null;
            });
        }
        /**
         * 上傳目前用戶照片
         * @param file
         */
        uploadPhoto(file) {
            return __awaiter(this, void 0, Promise, function* () {
            });
        }
        /**
         * 更新目前使用者資訊
         */
        update() {
            return __awaiter(this, void 0, Promise, function* () {
            });
        }
        //#endregion
        //#region Facebook串聯
        /**
         * 串聯Facebook帳號
         * @param token Facebook權杖
         */
        connectFB(token) {
            return __awaiter(this, void 0, Promise, function* () {
            });
        }
        /**
         * 取消串聯Facebook帳號
         */
        unconnectFB() {
            return __awaiter(this, void 0, Promise, function* () {
            });
        }
    }
    goodidea.User = User;
})(goodidea || (goodidea = {}));
//# sourceMappingURL=goodideaLib.js.map