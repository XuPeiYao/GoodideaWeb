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
    class Banner {
        static loadFromJSON(data) {
            var result = new Banner();
            result.id = data['Id'];
            result.url = data['Url'];
            return result;
        }
        static getBannerList() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/banner/list');
                var result = [];
                for (var i = 0; i < responseJSON['Result'].length; i++) {
                    result.push(Banner.loadFromJSON(responseJSON['Result'][i]));
                }
                return result;
            });
        }
    }
    goodidea.Banner = Banner;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Class {
        static loadFromJSON(data) {
            var result = new Class();
            result.id = data['Id'];
            result.name = data['Name'];
            return result;
        }
        static getClassList() {
            return __awaiter(this, void 0, Promise, function* () {
                var result = [];
                var responseJSON = yield goodidea.postAsync('api/class/list');
                for (var i = 0; i < responseJSON['Result'].length; i++) {
                    result.push(Class.loadFromJSON(responseJSON['Result'][i]));
                }
                return result;
            });
        }
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
        static loadFromJSON(data) {
            var result = new Competition();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.condition = [];
            for (var i = 0; i < data['Condition'].length; i++) {
                result.condition.push(goodidea.Class.loadFromJSON(data['Condition'][i]['Class']));
            }
            return result;
        }
        static getCompetitionList(active, vote) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/competition/list', null, { active: active, vote: vote });
                var result = [];
                for (var i = 0; i < responseJSON['Result'].length; i++) {
                    result.push(Competition.loadFromJSON(responseJSON['Result'][i]));
                }
                return result;
            });
        }
        static getLoginUserQuota(competition) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = competition['id'] || competition;
                var responseJSON = yield goodidea.postAsync('api/Competition/getuserquota', null, {
                    Competition: id
                });
                return responseJSON['Result']['Quota'];
            });
        }
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
        static getDepartmentList() {
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
    class Forum {
        /**
         * 刪除這個討論
         */
        remove() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/forum/remove', null, {
                    forum: this.id
                });
            });
        }
        /**
         * 建立新的討論
         * @param project 目標提案的ID或Project物件
         * @param teamOnly 是否僅團隊可見(必須為團隊成員)
         * @param content 內容
         */
        static createForum(project, teamOnly, content) {
            return __awaiter(this, void 0, Promise, function* () {
                var result = new Forum();
                var id = project['id'] || project;
                var responseJSON = yield goodidea.postAsync('api/forum/add', null, {
                    project: id,
                    team: teamOnly,
                    content: content
                });
                return Forum.loadFromJSON(responseJSON['Result']);
            });
        }
        /**
         * 取得指定提案的討論清單
         * @param project 指定提案的ID或Project物件
         * @param teamOnly 是否為團隊訊息(必須為團隊成員)
         */
        static getForumList(project, teamOnly) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = project['id'] || project;
                var responseJSON = yield goodidea.postAsync('api/forum/list', null, {
                    project: id,
                    length: 10,
                    team: teamOnly
                });
                var result = goodidea.ForumResultPage.loadFromJSON(responseJSON['Result']);
                result.index = 0;
                result.length = 10;
                result.team = teamOnly;
                result.url = 'api/forum/list';
                result.count = responseJSON['Count'];
                return result;
            });
        }
        static loadFromJSON(data) {
            var result = new Forum();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.user = goodidea.User.loadFromJSON(data['User']);
            result.time = new Date(data['Time']);
            return result;
        }
    }
    goodidea.Forum = Forum;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class ForumResultPage {
        constructor() {
            this.index = 0;
        }
        hasNext() {
            return this.index < this.count;
        }
        nextPage() {
            return __awaiter(this, void 0, Promise, function* () {
                var data = {
                    length: this.length,
                    index: this.index + this.length,
                    team: this.team
                };
                var responseJSON = yield goodidea.postAsync(this.url, null, data);
                var result = goodidea.ProjectResultPage.loadFromJSON(responseJSON);
                result.url = this.url;
                result.index = data.index;
                result.length = data.length;
                result.count = responseJSON['Count'];
                return result;
            });
        }
        static loadFromJSON(data) {
            var result = new ForumResultPage();
            result.result = [];
            for (var i = 0; i < data['length']; i++) {
                result.result.push(goodidea.Forum.loadFromJSON(data[i]));
            }
            return result;
        }
    }
    goodidea.ForumResultPage = ForumResultPage;
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
    class Link {
        static loadFromJSON(data) {
            var result = new Link();
            result.id = data['Id'];
            result.name = data['Name'];
            result.url = data['Url'];
            return result;
        }
        static getLinkList() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/link/list');
                var result = [];
                for (var i = 0; i < responseJSON['Result'].length; i++) {
                    result.push(Link.loadFromJSON(responseJSON['Result'][i]));
                }
                return result;
            });
        }
    }
    goodidea.Link = Link;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class MemberRequest {
        static loadFromJSON(data) {
            var result = new MemberRequest();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.specialty = [];
            for (var i = 0; i < data['Specialty'].length; i++) {
                result.specialty.push(goodidea.MemberRequestSpecialty.loadFromJSON(data['Specialty'][i]));
            }
            return result;
        }
        /**
         * 新增需求技能
         * @param specialty 技能字串
         */
        addSpecialty(specialty) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/project/addMemberSpecialty', null, { memberRequest: this.id, specialty: specialty });
                this.specialty.push(goodidea.MemberRequestSpecialty.loadFromJSON(responseJSON['Result']));
            });
        }
        /**
         * 移除指定技能需求
         * @param specialty 指定技能之ID或MemberSpecialty物件
         */
        removeSpecialty(specialty) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = specialty['id'] || specialty;
                yield goodidea.postAsync('api/project/removeMemberSpecialty', null, { specialty: id });
                this.specialty = this.specialty.filter(x => x.id != id);
            });
        }
        /**
         * 使用目前登入使用者應徵
         */
        joinMemberRequest() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/JoinMemberResponse', null, { memberRequest: this.id });
            });
        }
        /**
         * 將目前登入使用者脫離該應徵
         */
        quitMemberRequest() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/QuitMemberResponse', null, { memberRequest: this.id });
            });
        }
        /**
         * 取得應徵人員名單
         */
        getMemberResponseList() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/project/MemberResponseList', null, { project: this.projectId });
                var memberRequest = responseJSON['Result'].filter(x => x['ProjectId'] == this.projectId)[0];
                return memberRequest['MemberResponse'].map(x => goodidea.User.loadFromJSON(x['User']));
            });
        }
        /**
         * 將指定使用者抽離應徵人員清單
         */
        removeMemberResponse(user) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = user['id'] || user;
                yield goodidea.postAsync('api/project/RemoveMemberResponse', null, {
                    memberRequest: this.projectId,
                    user: id
                });
            });
        }
    }
    goodidea.MemberRequest = MemberRequest;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class MemberRequestSpecialty {
        static loadFromJSON(data) {
            var result = new MemberRequestSpecialty();
            result.id = data['Id'];
            result.value = data['Value'];
            return result;
        }
    }
    goodidea.MemberRequestSpecialty = MemberRequestSpecialty;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    (function (OrderBy) {
        OrderBy[OrderBy["lastEditTime"] = 0] = "lastEditTime";
        OrderBy[OrderBy["name"] = 1] = "name";
        OrderBy[OrderBy["class"] = 2] = "class";
        OrderBy[OrderBy["views"] = 3] = "views";
        OrderBy[OrderBy["votes"] = 4] = "votes";
        OrderBy[OrderBy["awardsFirst"] = 5] = "awardsFirst";
    })(goodidea.OrderBy || (goodidea.OrderBy = {}));
    var OrderBy = goodidea.OrderBy;
    class Project {
        constructor() {
            /**
             * 取得提案夾帶的檔案
             */
            this.files = [];
        }
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
                yield goodidea.postAsync('api/project/update', null, {
                    project: this.id,
                    name: this.name,
                    class: this.class.id,
                    content: this.content,
                    isPublish: this.isPublish,
                    teamName: this.team.name
                });
            });
        }
        /**
         * 加入新的團隊成員
         * @param user 團隊成員的ID或User物件
         * @param memberType 團隊成員類型
         */
        addMember(user, memberType) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = user['id'] || user; //isTeacher: boolean, isAssistant: boolean
                memberType = memberType || goodidea.MemberType.member;
                var data = { project: this.id, user: id, isTeacher: memberType != goodidea.MemberType.member, isAssistant: memberType == goodidea.MemberType.assistant };
                var responseJSON = yield goodidea.postAsync('api/project/addmember', null, data);
                var member = goodidea.TeamMember.loadFromJSON(responseJSON['Result']);
                this.team.group.push(member);
                return member;
            });
        }
        /**
         * 剔除團隊成員
         * @param member 團隊成員的ID或TeamMember、User物件
         */
        removeMember(member) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = member['user']['id'] || member['id'] || member;
                var responseJSON = yield goodidea.postAsync('api/project/removemember', null, { project: this.id, user: id });
                this.team.group = this.team.group.filter(x => x.user.id != id);
            });
        }
        /**
         * 上傳相關文件
         * @param name 檔案名稱
         * @param file 檔案
         */
        uploadFile(name, file) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/project/addfile', null, { project: this.id, file: file, name: name });
                var result = goodidea.DocumentInfo.loadFromJSON(responseJSON['Result']);
                this.files.push(goodidea.DocumentInfo.loadFromJSON(responseJSON['Result']));
                return result;
            });
        }
        /**
         * 刪除相關文件
         * @param doc 檔案ID或DocumentInfo物件
         */
        deleteFile(doc) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = doc['id'] || doc;
                var responseJSON = yield goodidea.postAsync('api/project/removefile', null, { file: id });
                this.files = this.files.filter(x => x.id != id);
            });
        }
        /**
         * 上傳封面
         * @param file 封面檔案
         */
        uploadCover(file) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/project/update', null, { project: this.id, cover: file });
                var result = goodidea.FileInfo.loadFromJSON(responseJSON['Result']);
                this.cover = result;
                return result;
            });
        }
        /**
         * 參加指定競賽
         * @param competition 指定競賽的ID或Competition物件
         */
        joinCompetition(competition) {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/joinCompetition', null, { project: this.id });
                this.load(); //reload Project
            });
        }
        /**
         * 投票並回傳剩餘票數
         */
        vote() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/project/vote', null, {
                    project: this.id
                });
                return responseJSON['Result']['Quota'];
            });
        }
        /**
         * 複製目前提案
         * @param name 新的提案名稱
         */
        clone(name) {
            return __awaiter(this, void 0, Promise, function* () {
                var data = { project: this.id };
                if (name)
                    data['name'] = name;
                var responseJSON = yield goodidea.postAsync('api/project/clone', null, data);
                return Project.loadFromJSON(responseJSON['Result']);
            });
        }
        /**
         * 刪除目前專案
         */
        delete() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/delete', null, { project: this.id });
            });
        }
        /**
         * 新增提案
         * @param name 提案名稱
         * @param _class 提案分類ID或Class物件
         * @param temp 提案競賽樣板，競賽ID或Competition物件
         */
        static create(name, _class, temp) {
            return __awaiter(this, void 0, Promise, function* () {
                var data = {
                    name: name,
                    class: _class['id'] || _class
                };
                if (temp)
                    data['competition'] = temp['id'] || temp;
                var responseJSON = yield goodidea.postAsync('api/project/add', null, data);
                return Project.loadFromJSON(responseJSON['Result']);
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
            result.owner = goodidea.User.loadFromJSON(data['Owner']);
            result.files = [];
            if (data['Files']) {
                for (var i = 0; i < data['Files'].length; i++) {
                    result.files.push(goodidea.DocumentInfo.loadFromJSON(data['Files'][i]));
                }
            }
            if (data['MemberRequest']) {
                result.memberRequest = [];
                for (var i = 0; i < data['MemberRequest'].length; i++) {
                    result.memberRequest.push(goodidea.MemberRequest.loadFromJSON(data['MemberRequest'][i]));
                }
            }
            if (data['LastEditTime']) {
                result.lastEditTime = new Date(data['LastEditTime']);
            }
            if (data['Team']) {
                result.team = goodidea.Team.loadFromJSON(data['Team']);
            }
            return result;
        }
        /**
         * 取得指定使用者ID或User物件對象所有提案
         * @param user 指定使用者
         */
        static getUserProjects(user) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = user['id'] || user;
                var responseJSON = yield goodidea.postAsync('api/project/userlist', null, { id: id });
                return goodidea.UserProjectList.loadFromJSON(responseJSON['Result']);
            });
        }
        /**
         * 取得指定使用者所有提案
         * @param id 指定使用者ID
         */
        static getProjectById(id) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/project/get', null, { project: id });
                return Project.loadFromJSON(responseJSON['Result']);
            });
        }
        /**
         * 取得目前登入使用者的所有提案
         */
        static getLoginUserProjects() {
            return __awaiter(this, void 0, Promise, function* () {
                return Project.getUserProjects("me");
            });
        }
        /**
         * 取得目前系統中公開提案清單
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        static getProjectList(_class, competition, order) {
            return __awaiter(this, void 0, Promise, function* () {
                return Project.search(null, _class, competition, order);
            });
        }
        /**
         * 取得目前系統中有徵人公開提案清單
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        static getRequestProjectList(_class, competition, order) {
            return __awaiter(this, void 0, Promise, function* () {
                var api = 'api/project/requestList';
                var data = {
                    length: 10,
                    class: _class ? _class.id : 'N',
                    competition: competition ? competition.id : 'N',
                    order: OrderBy[order]
                };
                var responseJSON = yield goodidea.postAsync(api, null, data);
                var result = goodidea.ProjectResultPage.loadFromJSON(responseJSON);
                result.url = api;
                result.index = 0;
                result.length = 10;
                result.competition = competition;
                result.class = _class;
                result.order = order;
                result.count = responseJSON['Count'];
                return result;
            });
        }
        /**
         * 搜尋目前系統中公開提案
         * @param keyword 關鍵字
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        static search(keyword, _class, competition, order) {
            return __awaiter(this, void 0, Promise, function* () {
                var api = 'api/project/list';
                var data = {
                    length: 10,
                    class: _class ? _class.id : 'N',
                    competition: competition ? competition.id : 'N',
                    order: OrderBy[order]
                };
                if (keyword != null) {
                    api = 'api/project/search';
                    data['q'] = keyword;
                }
                var responseJSON = yield goodidea.postAsync(api, null, data);
                var result = goodidea.ProjectResultPage.loadFromJSON(responseJSON);
                result.url = api;
                result.index = 0;
                result.length = 10;
                result.competition = competition;
                result.class = _class;
                result.keyword = keyword;
                result.order = order;
                result.count = responseJSON['Count'];
                return result;
            });
        }
    }
    goodidea.Project = Project;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class ProjectResultPage {
        constructor() {
            this.index = 0;
        }
        hasNext() {
            return this.index < this.count;
        }
        nextPage() {
            return __awaiter(this, void 0, Promise, function* () {
                var data = {
                    length: this.length,
                    index: this.index + this.length,
                    class: this.class ? this.class.id : 'N',
                    competition: this.competition ? this.competition.id : 'N',
                    order: goodidea.OrderBy[this.order]
                };
                if (this.keyword)
                    data['q'] = this.keyword;
                var responseJSON = yield goodidea.postAsync(this.url, null, data);
                var result = ProjectResultPage.loadFromJSON(responseJSON);
                result.url = this.url;
                result.index = data.index;
                result.length = data.length;
                result.competition = this.competition;
                result.class = this.class;
                result.keyword = this.keyword;
                result.order = this.order;
                result.count = responseJSON['Count'];
                return result;
            });
        }
        static loadFromJSON(data) {
            var result = new ProjectResultPage();
            result.result = [];
            for (var i = 0; i < data['Result'].length; i++) {
                result.result.push(goodidea.Project.loadFromJSON(data['Result'][i]));
            }
            return result;
        }
    }
    goodidea.ProjectResultPage = ProjectResultPage;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    goodidea.host = "http://goodidea.nkfust.edu.tw/";
    goodidea.origin = "http://goodidea.nkfust.edu.tw/";
    goodidea.version = "1.0.1";
    function postAsync(url, header, data, user, password, progressCallback) {
        return __awaiter(this, void 0, Promise, function* () {
            var request = new nativeExtensions.HttpClient();
            request.withCredentials = true;
            url = goodidea.host + url;
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
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Team {
        constructor() {
            this.group = [];
        }
        static loadFromJSON(data) {
            var result = new Team();
            result.name = data['Name'];
            result.group = [];
            for (var i = 0; i < data['Group'].length; i++) {
                result.group.push(goodidea.TeamMember.loadFromJSON(data['Group'][i]));
            }
            return result;
        }
    }
    goodidea.Team = Team;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    (function (MemberType) {
        MemberType[MemberType["teacher"] = 0] = "teacher";
        MemberType[MemberType["assistant"] = 1] = "assistant";
        MemberType[MemberType["member"] = 2] = "member";
    })(goodidea.MemberType || (goodidea.MemberType = {}));
    var MemberType = goodidea.MemberType;
    class TeamMember {
        get memberType() {
            if (!this.isTeacher)
                return MemberType.member;
            return this.isAssistant ? MemberType.assistant : MemberType.teacher;
        }
        set memberType(value) {
            switch (value) {
                case MemberType.member:
                    this.isTeacher = false;
                    this.isAssistant = false;
                    break;
                case MemberType.assistant:
                    this.isTeacher = true;
                    this.isAssistant = true;
                    break;
                case MemberType.teacher:
                    this.isTeacher = true;
                    this.isAssistant = false;
                    break;
            }
        }
        static loadFromJSON(data) {
            var result = new TeamMember();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.user = goodidea.User.loadFromJSON(data['User']);
            return result;
        }
    }
    goodidea.TeamMember = TeamMember;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class User {
        constructor() {
            /**
             * 取得使用者專長
             */
            this.specialty = [];
        }
        //#region 資料更新
        static loadFromJSON(data) {
            var result = new User();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            var sp = data['Specialty'];
            result.specialty = [];
            if (sp) {
                for (var i = 0; i < sp.length; i++) {
                    if (sp[i]['Id']) {
                        result.specialty.push(goodidea.KeyValue.loadFromJSON(sp[i]));
                    }
                    else {
                        result.specialty.push(sp[i]);
                    }
                }
            }
            result.isLinkFB = data['FB'] != null;
            if (data['Photo']) {
                result.photo = goodidea.FileInfo.loadFromJSON(data['Photo']);
            }
            if (data['Department']) {
                result.department = goodidea.Department.loadFromJSON(data['Department']);
            }
            return result;
        }
        /**
         * 讀取使用者資料
         */
        load() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/user/about', null, {
                    id: this.id
                });
                var user = yield User.loadFromJSON(responseJSON['Result']);
                var fields = user.getKeys();
                for (var i = 0; i < fields.length; i++) {
                    this[fields[i]] = user[fields[i]];
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
                var responseJSON = yield goodidea.postAsync('api/user/AddSpecialty', null, {
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
                yield goodidea.postAsync('api/user/RemoveSpecialty', null, {
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
                var responseJSON = yield goodidea.postAsync('api/user/update', null, { Photo: file });
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
                yield goodidea.postAsync('api/user/update', null, data);
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
                yield goodidea.postAsync('api/user/linkFB', null, {
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
                yield goodidea.postAsync('api/user/unlinkfb');
                this.isLinkFB = false;
            });
        }
        static login(id, password) {
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
                var responseJSON = yield goodidea.postAsync(apiPath, null, postData);
                return yield User.getUserById(responseJSON['Result'].Id);
            });
        }
        /**
         * 登出系統
         */
        static logout() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/user/logout');
            });
        }
        /**
         * 取得目前登入使用者資訊
         */
        static getLoginUser() {
            return __awaiter(this, void 0, Promise, function* () {
                var response = yield goodidea.postAsync('api/user/checklogin');
                if (response['Result'] == null)
                    return null;
                return yield User.getUserById(response['Result'].Id);
            });
        }
        //#endregion
        /**
         * 取得指定使用者相關資訊
         */
        static getUserById(id) {
            return __awaiter(this, void 0, Promise, function* () {
                var result = new User();
                result.id = id;
                yield result.load();
                return result;
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