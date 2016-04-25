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
    class College {
        static loadFromJSON(data) {
            var result = new College();
            result.id = data['Id'];
            result.name = data['Name'];
            return result;
        }
    }
    goodidea.College = College;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Competition {
    }
    goodidea.Competition = Competition;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Department {
        static loadFromJSON(data) {
            var result = new Department();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.college = goodidea.College.loadFromJSON(data['College']);
            return result;
        }
        /**
         * 取得所有系所陣列
         */
        static getAllDepartments() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/Department/list');
                var dep = responseJSON['Result'];
                var result = [];
                for (var i = 0; i < dep.length; i++) {
                    result.push(Department.loadFromJSON(dep[i]));
                }
                return result;
            });
        }
    }
    goodidea.Department = Department;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class DocumentInfo {
        static loadFromJSON(data) {
            var result = new DocumentInfo();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[fields[i].toLowerCase()] = data[fields[i]];
            }
            result.file = goodidea.FileInfo.loadFromJSON(data['File']);
            return result;
        }
    }
    goodidea.DocumentInfo = DocumentInfo;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    (function (FileType) {
        FileType[FileType["Document"] = 0] = "Document";
        FileType[FileType["Image"] = 1] = "Image";
    })(goodidea.FileType || (goodidea.FileType = {}));
    var FileType = goodidea.FileType;
    class FileInfo {
        static loadFromJSON(data) {
            var result = new FileInfo();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[fields[i].toLowerCase()] = data[fields[i]];
            }
            result['type'] = FileType[data['Type']];
            return result;
        }
    }
    goodidea.FileInfo = FileInfo;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class KeyValue {
        static loadFromJSON(data) {
            var result = new KeyValue();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[fields[i].toLowerCase()] = data[fields[i]];
            }
            return result;
        }
    }
    goodidea.KeyValue = KeyValue;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    (function (OrderBy) {
    })(goodidea.OrderBy || (goodidea.OrderBy = {}));
    var OrderBy = goodidea.OrderBy;
    class Project {
        /**
         * 讀取提案內容
         */
        load() {
            return __awaiter(this, void 0, Promise, function* () {
                var temp = yield Project.getProjectById(this.id);
                var fields = temp.getKeys();
                for (var i = 0; i < fields.length; i++) {
                    if (temp[fields[i]] instanceof Function)
                        continue;
                    this[fields[i]] = temp[fields[i]];
                }
            });
        }
        /**
         * 更新提案內容
         */
        update() {
            return __awaiter(this, void 0, Promise, function* () {
                return null;
            });
        }
        static loadFromJSON(data) {
            var result = new Project();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            return result;
        }
        static getUserProjects(user) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = user['id'] || user;
                var responseJSON = yield goodidea.postAsync('api/project/userlist', null, { id: id });
                return goodidea.UserProjectList.loadFromJSON(responseJSON['Result']);
            });
        }
        static getProjectById(id) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/project/get', null, { project: id });
                return Project.loadFromJSON(responseJSON['Result']);
            });
        }
        static getLoginUserProjects() {
            return __awaiter(this, void 0, Promise, function* () {
                return Project.getUserProjects("me");
            });
        }
        static getProjectList(_class, competition, orderby) {
            return __awaiter(this, void 0, Promise, function* () {
                return Project.search(null, _class, competition, orderby);
            });
        }
        static search(keyword, _class, competition, orderby) {
            return __awaiter(this, void 0, Promise, function* () {
                return null;
            });
        }
    }
    goodidea.Project = Project;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class ProjectResultPage {
        nextPage() {
            return __awaiter(this, void 0, Promise, function* () {
                return null;
            });
        }
    }
    goodidea.ProjectResultPage = ProjectResultPage;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Team {
    }
    goodidea.Team = Team;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class TeamMember {
    }
    goodidea.TeamMember = TeamMember;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    goodidea.host = "http://goodidea.nkfust.edu.tw/";
    goodidea.origin = "http://goodidea.nkfust.edu.tw/";
    function postAsync(url, header, data, user, password, progressCallback) {
        return __awaiter(this, void 0, Promise, function* () {
            var request = new nativeExtensions.HttpClient();
            if (!data)
                data = {};
            data['origin'] = goodidea.origin;
            var response = JSON.parse((yield request.postAsync(url, header, data, user, password, progressCallback)).resultText);
            if (!response.Success)
                throw response.Result;
            return response;
        });
    }
    goodidea.postAsync = postAsync;
    function firstToLowerCase(input) {
        return input[0].toLowerCase() + input.substring(1);
    }
    goodidea.firstToLowerCase = firstToLowerCase;
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
        //#region 資料更新
        /**
         * 讀取使用者資料
         */
        load() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield postAsync('api/user/about', null, {
                    id: this.id
                });
                var fields = ['Name', 'StudentId', 'Phone', 'Email', 'Information'];
                for (var i = 0; i < fields.length; i++) {
                    this[firstToLowerCase(fields[i])] = responseJSON['Result'][fields[i]];
                }
                var sp = responseJSON['Result']['Specialty'];
                this.specialty = [];
                for (var i = 0; i < sp.length; i++) {
                    this.specialty.push(goodidea.KeyValue.loadFromJSON(sp[i]));
                }
                this.isLinkFB = responseJSON['Result']['FB'] != null;
                if (responseJSON['Result']['Photo']) {
                    this.photo = goodidea.FileInfo.loadFromJSON(responseJSON['Result']['Photo']);
                }
                if (responseJSON['Result']['Department']) {
                    this.department = goodidea.Department.loadFromJSON(responseJSON['Result']['Department']);
                }
            });
        }
        //#region 專長
        /**
         * 新增使用者專長
         * @param value 專長
         */
        addSpecialty(value) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield postAsync('api/user/AddSpecialty', null, {
                    Specialty: value
                });
                var result = goodidea.KeyValue.loadFromJSON(responseJSON['Result']);
                this.specialty.push(result);
                return result;
            });
        }
        /**
         * 移除使用者專長
         * @param value 專長Id或物件
         */
        removeSpecialty(value) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = null;
                if (value['id']) {
                    id = value['id'];
                }
                else {
                    id = this.specialty.filter(x => x.value == value).first().id;
                }
                yield postAsync('api/user/RemoveSpecialty', null, {
                    Specialty: id
                });
                this.specialty = this.specialty.filter(x => x.id != id);
            });
        }
        //#endregion
        /**
         * 上傳目前用戶照片
         * @param file
         */
        uploadPhoto(file) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield postAsync('api/user/update', null, { Photo: file });
                var photo = goodidea.FileInfo.loadFromJSON(responseJSON['Result']);
                this.photo = photo;
                return photo;
            });
        }
        /**
         * 更新使用者資訊
         */
        update() {
            return __awaiter(this, void 0, Promise, function* () {
                var data = {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    information: this.information
                };
                if (this.department) {
                    data['department'] = this.department.id;
                }
                yield postAsync('api/user/update', null, data);
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
                yield postAsync('api/user/linkFB', null, {
                    token: token
                });
                this.isLinkFB = true;
            });
        }
        /**
         * 取消串聯Facebook帳號
         */
        unconnectFB() {
            return __awaiter(this, void 0, Promise, function* () {
                yield postAsync('api/user/unlinkfb');
                this.isLinkFB = false;
            });
        }
    }
    goodidea.User = User;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class UserProjectList {
        constructor() {
            this.own = [];
            this.participate = [];
        }
        static loadFromJSON(data) {
            var result = new UserProjectList();
            for (var i = 0; i < data['Own'].length; i++) {
                result.own.push(goodidea.Project.loadFromJSON(data['Own'][i]));
            }
            for (var i = 0; i < data['Participate'].length; i++) {
                result.participate.push(goodidea.Project.loadFromJSON(data['Participate'][i]));
            }
            return result;
        }
    }
    goodidea.UserProjectList = UserProjectList;
})(goodidea || (goodidea = {}));
//# sourceMappingURL=goodideaLib.js.map