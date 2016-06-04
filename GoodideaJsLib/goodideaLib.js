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
        /**
         * 由JSON資料產生Banner
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new Banner();
            result.id = data['Id'];
            result.url = data['Url'];
            return result;
        }
        /**
         * 取得Banner列表
         */
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
        /**
         * 由JSON資料產生Class
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new Class();
            result.id = data['Id'];
            result.name = data['Name'];
            return result;
        }
        /**
         * 取得分類列表
         */
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
        /**
         * 由JSON資料產生College
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new College();
            console.log(data);
            result.id = data['Id'];
            result.name = data['Name'];
            if (data['Departments']) {
                result.departments = [];
                for (var i = 0; i < data['Departments'].length; i++) {
                    result.departments.push(goodidea.Department.loadFromJSON(data['Departments'][i]));
                }
            }
            return result;
        }
        static getCollegeList() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/Department/list', null, { college: true });
                var result = [];
                for (var i = 0; i < responseJSON['Result'].length; i++) {
                    var temp = responseJSON['Result'][i].College;
                    temp.Departments = responseJSON['Result'][i].Departments;
                    console.log(temp);
                    result.push(College.loadFromJSON(temp));
                }
                return result;
            });
        }
    }
    goodidea.College = College;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Competition {
        /**
         * 取得競賽樣板Markdown的章節剖析物件
         */
        getTemplateSegments() {
            return new goodidea.MarkdownSegment(this.template || "");
        }
        /**
         * 由JSON資料產生Competition
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new Competition();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.condition = [];
            for (var i = 0; i < data['Condition'].length; i++) {
                result.condition.push(goodidea.Class.loadFromJSON(data['Condition'][i]['Class']));
            }
            result.submitRange = goodidea.TimeRange.loadFromJSON(data['SubmitRange']);
            result.voteRange = goodidea.TimeRange.loadFromJSON(data['VoteRange']);
            return result;
        }
        /**
         * 透過限制條件取得競賽清單
         * @param active 目前可參賽
         * @param vote 目前可投票
         */
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
        /**
         * 取得目前登入使用者針對指定競賽剩餘可投票數
         * @param competition 競賽
         */
        static getLoginUserQuota(competition) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = competition['id'] || competition;
                var responseJSON = yield goodidea.postAsync('api/Competition/getuserquota', null, {
                    Competition: id
                });
                return responseJSON['Result'];
            });
        }
    }
    goodidea.Competition = Competition;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Course {
        /**
         * 由JSON資料產生Course
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new Course();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            return result;
        }
        /**
         * 取得現有課程列表
         */
        static getCourseList() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/course/list');
                var result = [];
                for (var i = 0; i < responseJSON['Result']['length']; i++) {
                    result.push(Course.loadFromJSON(responseJSON['Result'][i]));
                }
                return result;
            });
        }
    }
    goodidea.Course = Course;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Department {
        /**
         * 由JSON資料產生Department
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new Department();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            if (data['College']) {
                result.college = goodidea.College.loadFromJSON(data['College']);
            }
            return result;
        }
        /**
         * 取得所有系所列表
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
        /**
         * 由JSON資料產生DocumentInfo
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new DocumentInfo();
            var fields = getKeys(data);
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
        FileType[FileType["Image"] = 1] = "Image"; //圖片類型
    })(goodidea.FileType || (goodidea.FileType = {}));
    var FileType = goodidea.FileType;
    class FileInfo {
        /**
         * 由JSON資料產生FileInfo
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new FileInfo();
            var fields = getKeys(data);
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
        static remove(forum) {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/forum/remove', null, {
                    forum: forum.id
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
                var result = new goodidea.PageResult(goodidea.Forum);
                result.url = 'api/forum/list';
                result.length = 10;
                result.params = {
                    project: id,
                    team: teamOnly
                };
                yield result.load();
                return result;
            });
        }
        /**
         * 由JSON資料產生Forum
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new Forum();
            var fields = getKeys(data);
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
    class KeyValue {
        static loadFromJSON(data) {
            var result = new KeyValue();
            var fields = getKeys(data);
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
        /**
         * 由JSON資料產生Link
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new Link();
            result.id = data['Id'];
            result.name = data['Name'];
            result.url = data['Url'];
            return result;
        }
        /**
         * 取得相關連結列表
         */
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
    /**
     * markdown章節剖析
     */
    class MarkdownSegment {
        constructor(content) {
            this.content = content;
            this.level = 0;
        }
        get segments() {
            var temp = MarkdownSegment.parse(this.content);
            if (temp == null)
                return [];
            return temp.map(x => {
                x.level = this.level + 1;
                return x;
            });
        }
        static parse(content, level = 1) {
            var result = [];
            var regex = new RegExp("^" + "#".repeat(level) + "\\s+.+");
            var lines = content.replace(/\r/g, "").split("\n");
            for (var index = 0; index < lines.length; index++) {
                if (!regex.test(lines[index]))
                    continue;
                var newItem = new MarkdownSegment(null);
                newItem.level = 0;
                newItem.title = lines[index].trim().split(/\s+/g, 2)[1];
                newItem.contentIndex = index;
                result.push(newItem);
            }
            if (result.length == 0 && level == 11) {
                return null;
            }
            else if (result.length == 0) {
                return MarkdownSegment.parse(content, level + 1);
            }
            if (result.first().contentIndex != 0) {
                var newItem = new MarkdownSegment(null);
                newItem.level = 0;
                newItem.title = null;
                newItem.contentIndex = 0;
                result.splice(0, 0, newItem);
            }
            for (var index = 0; index < result.length; index++) {
                var endIndex = lines.length - 1;
                if (index != result.length - 1) {
                    endIndex = result[index + 1].contentIndex;
                }
                result[index].content = lines
                    .skip(result[index].contentIndex + 1)
                    .take(endIndex - result[index].contentIndex - 1)
                    .join("\n");
            }
            return result;
        }
    }
    goodidea.MarkdownSegment = MarkdownSegment;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class MemberRequest {
        /**
         * 由JSON資料產生MemberRequest
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new MemberRequest();
            var fields = getKeys(data);
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
                this.sent = true;
            });
        }
        /**
         * 將目前登入使用者脫離該應徵
         */
        quitMemberRequest() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/QuitMemberResponse', null, { memberRequest: this.id });
                this.sent = false;
            });
        }
        /**
         * 取得應徵人員名單
         */
        getMemberResponseList() {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/project/MemberResponseList', null, { project: this.projectId });
                var memberRequest = responseJSON['Result'].filter(x => x['Id'] == this.id)[0];
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
                    memberRequest: this.id,
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
        /**
         * 由JSON資料產生MemberRequestSpecialty
         * @param data 資料來源
         */
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
    class News {
        /**
         * 透過最新消息Id取得最新消息
         * @param id 最新消息Id
         */
        static getNewsById(id) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = yield goodidea.postAsync('api/news/get', null, {
                    news: id
                });
                return News.loadFromJSON(responseJSON['Result']);
            });
        }
        /**
         * 由JSON資料產生News
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new News();
            result.id = data['Id'];
            result.title = data['Title'];
            result.views = data['Views'];
            result.timeString = data['Time'];
            if (!result.timeString['substring']) {
                result.time = new Date(result.timeString);
            }
            if (data['Content'])
                result.content = data['Content'];
            if (data['Files']) {
                result.files = [];
                for (var i = 0; i < data['Files'].length; i++) {
                    result.files.push(goodidea.DocumentInfo.loadFromJSON(data['Files'][i]));
                }
            }
            return result;
        }
        /**
         * 取得最新消息分頁列表
         */
        static getNewsList() {
            return __awaiter(this, void 0, Promise, function* () {
                var result = new goodidea.PageResult(goodidea.News);
                result.length = 5;
                result.url = 'api/news/list';
                yield result.load();
                return result;
            });
        }
    }
    goodidea.News = News;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class PageResult {
        /**
         * 建構分頁查詢結果
         * @param type 結果類型
         */
        constructor(type) {
            /*
             * 分頁查詢參數
             */
            this.params = {};
            /*
             * 查詢結果總數量
             */
            this.count = 0;
            /*
             * 目前查詢結果起始索引
             */
            this.index = 0;
            this.type = type;
        }
        /**
         * 是否有下一個分頁
         */
        hasNext() {
            return this.index + this.length < this.count;
        }
        /*
         * 讀取查詢結果
         */
        load() {
            return __awaiter(this, void 0, Promise, function* () {
                var data = {
                    index: this.index,
                    length: this.length
                };
                for (var key in this.params)
                    data[key] = this.params[key];
                var responseJSON = yield goodidea.postAsync(this.url, null, data);
                this.count = responseJSON['Count'];
                this.result = [];
                for (var i = 0; i < responseJSON['Result'].length; i++) {
                    this.result.push(this.type['loadFromJSON'](responseJSON['Result'][i]));
                }
            });
        }
        /*
         * 取得下一頁查詢結果
         */
        nextPage() {
            return __awaiter(this, void 0, Promise, function* () {
                var result = new PageResult(this.type);
                result.index = this.index + this.length;
                result.length = this.length;
                result.params = this.params;
                result.url = this.url;
                yield result.load();
                return result;
            });
        }
        /**
         * 由JSON資料產生PageResult
         * @param data 資料來源
         */
        static loadFromJSON(type, data) {
            var result = new PageResult(type);
            result.result = [];
            for (var i = 0; i < data['Result'].length; i++) {
                result.result.push(type['loadFromJSON'](data['Result'][i]));
            }
            return result;
        }
    }
    goodidea.PageResult = PageResult;
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
                var fields = getKeys(temp);
                for (var i = 0; i < fields.length; i++) {
                    if (temp[fields[i]] instanceof Function)
                        continue;
                    this[fields[i]] = temp[fields[i]];
                }
            });
        }
        /**
         * 取得提案Markdown的章節剖析物件
         */
        getContentSegments() {
            return new goodidea.MarkdownSegment(this.content);
        }
        /**
         * 更新提案
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
         * 更新提案內容
         */
        updateContent() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/update', null, {
                    project: this.id,
                    content: this.content
                });
            });
        }
        //#region 細部更新操作
        /**
         * 更新提案隊伍名稱
         */
        updateTeamName() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/update', null, {
                    project: this.id,
                    teamName: this.team.name
                });
            });
        }
        /**
         * 更新提案名稱
         */
        updateName() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/update', null, {
                    project: this.id,
                    name: this.name
                });
            });
        }
        /**
         * 更新提案類別
         */
        updateClass() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/update', null, {
                    project: this.id,
                    class: this.class.id
                });
            });
        }
        /**
         * 更新提案公開狀態
         */
        updatePublish() {
            return __awaiter(this, void 0, Promise, function* () {
                yield goodidea.postAsync('api/project/update', null, {
                    project: this.id,
                    isPublish: this.isPublish
                });
            });
        }
        //#endregion
        /**
         * 加入新的團隊成員
         * @param user 團隊成員的ID或User物件
         * @param memberType 團隊成員類型
         */
        addMember(user, memberType) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = user['id'] || user; //isTeacher: boolean, isAssistant: boolean
                //memberType = memberType || MemberType.member;
                var data = {
                    project: this.id,
                    user: id,
                    isTeacher: memberType != goodidea.MemberType.member,
                    isAssistant: memberType == goodidea.MemberType.assistant
                };
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
         * 加入新的團隊成員需求
         * @param isTeacher 是否為指導教授
         * @param specialty 專長需求集合
         */
        addMemberRequest(isTeacher, specialty) {
            return __awaiter(this, void 0, Promise, function* () {
                var responseJSON = specialty ? yield goodidea.postAsync('api/project/addMemberRequest', null, {
                    project: this.id,
                    isTeacher: isTeacher,
                    specialty: specialty.join(",")
                }) : yield goodidea.postAsync('api/project/addMemberRequest', null, {
                    project: this.id,
                    isTeacher: isTeacher
                });
                var result = goodidea.MemberRequest.loadFromJSON(responseJSON['Result']);
                if (!this.memberRequest)
                    this.memberRequest = [];
                this.memberRequest.push(result);
                return result;
            });
        }
        removeMemberRequest(memberRequest) {
            return __awaiter(this, void 0, Promise, function* () {
                var id = memberRequest['id'] || memberRequest;
                yield goodidea.postAsync('api/project/removeMemberRequest', null, {
                    request: id
                });
                if (!this.memberRequest)
                    return;
                this.memberRequest = this.memberRequest.filter(x => x.id != id);
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
                var result = goodidea.FileInfo.loadFromJSON(responseJSON['Result']['Cover']);
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
                var id = competition['id'] || competition;
                yield goodidea.postAsync('api/project/joinCompetition', null, {
                    project: this.id,
                    competition: id
                });
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
         * 取得目前提案的編輯紀錄
         */
        getProjectUpdateLogList() {
            return __awaiter(this, void 0, Promise, function* () {
                return yield goodidea.ProjectUpdateLog.getUpdateLogs(this);
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
        /**
         * 由JSON資料產生Project
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new Project();
            var fields = getKeys(data);
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
            if (data['Class']) {
                result.class = goodidea.Class.loadFromJSON(data['Class']);
            }
            if (data['Competition']) {
                result.competition = goodidea.Competition.loadFromJSON(data['Competition']);
            }
            if (data['Cover']) {
                result.cover = goodidea.FileInfo.loadFromJSON(data['Cover']);
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
        static getRequestProjectList(keyword, _class, order) {
            return __awaiter(this, void 0, Promise, function* () {
                var result = new goodidea.PageResult(goodidea.Project);
                result.url = 'api/project/requestList';
                result.params = {
                    q: keyword,
                    class: _class ? (_class.id || _class) : 'N',
                    order: OrderBy[order]
                };
                result.length = 10;
                yield result.load();
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
                var result = new goodidea.PageResult(goodidea.Project);
                result.url = 'api/project/list';
                result.params = {
                    class: _class ? (_class.id || _class) : 'N',
                    competition: competition ? (competition.id || competition) : 'N',
                    order: OrderBy[order]
                };
                if (keyword != null) {
                    result.url = 'api/project/search';
                    result.params['q'] = keyword;
                }
                result.length = 10;
                yield result.load();
                return result;
            });
        }
    }
    goodidea.Project = Project;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class ProjectUpdateLog {
        /**
         * 取得提案
         */
        getProject() {
            return __awaiter(this, void 0, Promise, function* () {
                return goodidea.Project.getProjectById(this.projectId);
            });
        }
        /**
         * 取得指定提案更新紀錄分頁列表
         * @param project 提案
         */
        static getUpdateLogs(project) {
            return __awaiter(this, void 0, Promise, function* () {
                var result = new goodidea.PageResult(ProjectUpdateLog);
                result.url = 'api/project/updateLogs';
                result.params = {
                    project: project['id'] || project
                };
                result.length = 10;
                yield result.load();
                return result;
            });
        }
        /**
         * 使用Id取得指定提案更新紀錄
         * @param Id
         */
        static getUpdateLogById(project, id) {
            return __awaiter(this, void 0, Promise, function* () {
                var data = yield goodidea.postAsync('api/project/GetUpdateLog', null, {
                    project: project['id'] || project,
                    log: id
                });
                return ProjectUpdateLog.loadFromJSON(data['Result']);
            });
        }
        /**
         * 由JSON資料產生ProjectUpdateLog
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new ProjectUpdateLog();
            result.id = data['Id'];
            result.user = goodidea.User.loadFromJSON(data['User']);
            result.content = data['Content'];
            result.time = new Date(data['Time']);
            result.projectId = data['ProjectId'];
            return result;
        }
    }
    goodidea.ProjectUpdateLog = ProjectUpdateLog;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    goodidea.host = "http://goodidea.nkfust.edu.tw/";
    goodidea.origin = "http://goodidea.nkfust.edu.tw/";
    goodidea.version = "1.0.1";
    function postAsync(url, header, data, disableException, user, password, progressCallback) {
        return __awaiter(this, void 0, Promise, function* () {
            var request = new nativeExtensions.HttpClient();
            request.withCredentials = true;
            url = goodidea.host + url;
            if (!data)
                data = {};
            data['origin'] = goodidea.origin;
            var response = JSON.parse((yield request.postAsync(url, header, data, user, password, progressCallback)).resultText);
            if (!response.Success && !disableException) {
                var exception = {};
                for (var key in response.Result)
                    exception[firstToLowerCase(key)] = response.Result[key];
                if (goodidea.onException)
                    goodidea.onException(exception);
                throw exception;
            }
            return response;
        });
    }
    goodidea.postAsync = postAsync;
    function getServerDate() {
        return __awaiter(this, void 0, Promise, function* () {
            var response = yield postAsync('api/user/checklogin', null, null, true);
            return new Date(response['Time'] - new Date().getTimezoneOffset() * 60 * 1000);
        });
    }
    goodidea.getServerDate = getServerDate;
    function firstToLowerCase(input) {
        return input[0].toLowerCase() + input.substring(1);
    }
    goodidea.firstToLowerCase = firstToLowerCase;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    class Team {
        constructor() {
            /**
             * 團隊成員資訊
             */
            this.group = [];
        }
        /**
         * 由JSON資料產生Team
         * @param data 資料來源
         */
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
        /**
         * 取得或設定團隊成員類型
         */
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
        /**
         * 由JSON資料產生TeamMember
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new TeamMember();
            var fields = getKeys(data);
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
    class TimeRange {
        /**
         * 由JSON資料產生TimeRange
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            if (data == null)
                return null;
            var result = new TimeRange();
            result.start = new Date(data['Start']);
            result.end = new Date(data['End']);
            return result;
        }
    }
    goodidea.TimeRange = TimeRange;
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
        /**
         * 由JSON資料產生User
         * @param data 資料來源
         */
        static loadFromJSON(data) {
            var result = new User();
            var fields = getKeys(data);
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
                }, true);
                if (!responseJSON['Success'])
                    return;
                var user = yield User.loadFromJSON(responseJSON['Result']);
                var fields = getKeys(user);
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
                var user = User.loadFromJSON(responseJSON['Result']);
                this.photo = user.photo;
                return this.photo;
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
                    department: this.department.id,
                    information: this.information
                };
                if (this.department) {
                    data['department'] = this.department.id;
                }
                yield goodidea.postAsync('api/user/update', null, data);
            });
        }
        /**
         * 更新使用者自我介紹
         */
        updateInformation() {
            return __awaiter(this, void 0, Promise, function* () {
                var data = {
                    information: this.information
                };
                yield goodidea.postAsync('api/user/update', null, data);
            });
        }
        /**
         * 更新使用者除自我介紹外的資料
         */
        updateWithoutInformation() {
            return __awaiter(this, void 0, Promise, function* () {
                var data = {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    department: this.department.id,
                };
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
        //#endregion
        //#region 帳號狀態
        /**
         * 使用Facebook權杖登入
         * @param fbToken Facebook權杖
         */
        static fblogin(fbToken) {
            return __awaiter(this, void 0, Promise, function* () {
                var apiPath = "api/user/fblogin";
                var postData = {
                    token: fbToken
                };
                var responseJSON = yield goodidea.postAsync(apiPath, null, postData);
                return yield User.getUserById(responseJSON['Result'].Id);
            });
        }
        /**
         * 使用學校信箱登入
         * @param id 帳號
         * @param password 密碼
         */
        static login(id, password) {
            return __awaiter(this, void 0, Promise, function* () {
                var apiPath = "api/user/login";
                var postData = {
                    id: id,
                    pwd: password
                };
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
                var response = yield goodidea.postAsync('api/user/checklogin', null, null, true);
                if (response['Result'] == null || response['Result']['IsAdmin'])
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
            /**
             * 擁有的提案列表
             */
            this.own = [];
            /**
             * 參與的提案列表
             */
            this.participate = [];
        }
        /**
         * 由JSON資料產生UserProjectList
         * @param data 資料來源
         */
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