var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var goodidea;
(function (goodidea) {
    var Banner = (function () {
        function Banner() {
        }
        /**
         * 由JSON資料產生Banner
         * @param data 資料來源
         */
        Banner.loadFromJSON = function (data) {
            var result = new Banner();
            result.id = data['Id'];
            result.url = data['Url'];
            return result;
        };
        /**
         * 取得Banner列表
         */
        Banner.getBannerList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/banner/list')];
                        case 1:
                            responseJSON = _a.sent();
                            result = [];
                            for (i = 0; i < responseJSON['Result'].length; i++) {
                                result.push(Banner.loadFromJSON(responseJSON['Result'][i]));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return Banner;
    }());
    goodidea.Banner = Banner;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var Class = (function () {
        function Class() {
        }
        /**
         * 由JSON資料產生Class
         * @param data 資料來源
         */
        Class.loadFromJSON = function (data) {
            var result = new Class();
            result.id = data['Id'];
            result.name = data['Name'];
            return result;
        };
        /**
         * 取得分類列表
         */
        Class.getClassList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, responseJSON, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4 /*yield*/, goodidea.postAsync('api/class/list')];
                        case 1:
                            responseJSON = _a.sent();
                            for (i = 0; i < responseJSON['Result'].length; i++) {
                                result.push(Class.loadFromJSON(responseJSON['Result'][i]));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return Class;
    }());
    goodidea.Class = Class;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var College = (function () {
        function College() {
        }
        /**
         * 由JSON資料產生College
         * @param data 資料來源
         */
        College.loadFromJSON = function (data) {
            var result = new College();
            result.id = data['Id'];
            result.name = data['Name'];
            if (data['Departments']) {
                result.departments = [];
                for (var i = 0; i < data['Departments'].length; i++) {
                    result.departments.push(goodidea.Department.loadFromJSON(data['Departments'][i]));
                }
            }
            return result;
        };
        College.getCollegeList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, result, i, temp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/Department/list', null, { college: true })];
                        case 1:
                            responseJSON = _a.sent();
                            result = [];
                            for (i = 0; i < responseJSON['Result'].length; i++) {
                                temp = responseJSON['Result'][i].College;
                                temp.Departments = responseJSON['Result'][i].Departments;
                                result.push(College.loadFromJSON(temp));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return College;
    }());
    goodidea.College = College;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var Competition = (function () {
        function Competition() {
        }
        /**
         * 取得競賽樣板Markdown的章節剖析物件
         */
        Competition.prototype.getTemplateSegments = function () {
            return new goodidea.MarkdownSegment(this.template || "");
        };
        /**
         * 由JSON資料產生Competition
         * @param data 資料來源
         */
        Competition.loadFromJSON = function (data) {
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
        };
        /**
         * 透過限制條件取得競賽清單
         * @param active 目前可參賽
         * @param vote 目前可投票
         */
        Competition.getCompetitionList = function (active, vote) {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/competition/list', null, { active: active, vote: vote })];
                        case 1:
                            responseJSON = _a.sent();
                            result = [];
                            for (i = 0; i < responseJSON['Result'].length; i++) {
                                result.push(Competition.loadFromJSON(responseJSON['Result'][i]));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 取得目前登入使用者針對指定競賽剩餘可投票數
         * @param competition 競賽
         */
        Competition.getLoginUserQuota = function (competition) {
            return __awaiter(this, void 0, void 0, function () {
                var id, responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = competition['id'] || competition;
                            return [4 /*yield*/, goodidea.postAsync('api/Competition/getuserquota', null, {
                                    Competition: id
                                })];
                        case 1:
                            responseJSON = _a.sent();
                            return [2 /*return*/, responseJSON['Result']];
                    }
                });
            });
        };
        return Competition;
    }());
    goodidea.Competition = Competition;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var Course = (function () {
        function Course() {
        }
        /**
         * 由JSON資料產生Course
         * @param data 資料來源
         */
        Course.loadFromJSON = function (data) {
            var result = new Course();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            return result;
        };
        /**
         * 取得現有課程列表
         */
        Course.getCourseList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/course/list')];
                        case 1:
                            responseJSON = _a.sent();
                            result = [];
                            for (i = 0; i < responseJSON['Result']['length']; i++) {
                                result.push(Course.loadFromJSON(responseJSON['Result'][i]));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return Course;
    }());
    goodidea.Course = Course;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var Department = (function () {
        function Department() {
        }
        /**
         * 由JSON資料產生Department
         * @param data 資料來源
         */
        Department.loadFromJSON = function (data) {
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
        };
        /**
         * 取得所有系所列表
         */
        Department.getDepartmentList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, dep, result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/Department/list')];
                        case 1:
                            responseJSON = _a.sent();
                            dep = responseJSON['Result'];
                            result = [];
                            for (i = 0; i < dep.length; i++) {
                                result.push(Department.loadFromJSON(dep[i]));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return Department;
    }());
    goodidea.Department = Department;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var DocumentInfo = (function () {
        function DocumentInfo() {
        }
        /**
         * 由JSON資料產生DocumentInfo
         * @param data 資料來源
         */
        DocumentInfo.loadFromJSON = function (data) {
            var result = new DocumentInfo();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[fields[i].toLowerCase()] = data[fields[i]];
            }
            result.file = goodidea.FileInfo.loadFromJSON(data['File']);
            return result;
        };
        return DocumentInfo;
    }());
    goodidea.DocumentInfo = DocumentInfo;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var FileType;
    (function (FileType) {
        FileType[FileType["Document"] = 0] = "Document";
        FileType[FileType["Image"] = 1] = "Image"; //圖片類型
    })(FileType = goodidea.FileType || (goodidea.FileType = {}));
    var FileInfo = (function () {
        function FileInfo() {
        }
        /**
         * 由JSON資料產生FileInfo
         * @param data 資料來源
         */
        FileInfo.loadFromJSON = function (data) {
            var result = new FileInfo();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[fields[i].toLowerCase()] = data[fields[i]];
            }
            result['type'] = FileType[data['Type']];
            return result;
        };
        return FileInfo;
    }());
    goodidea.FileInfo = FileInfo;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var Forum = (function () {
        function Forum() {
        }
        /**
         * 刪除這個討論
         */
        Forum.remove = function (forum) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/forum/remove', null, {
                                forum: forum.id
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 建立新的討論
         * @param project 目標提案的ID或Project物件
         * @param teamOnly 是否僅團隊可見(必須為團隊成員)
         * @param content 內容
         */
        Forum.createForum = function (project, teamOnly, content) {
            return __awaiter(this, void 0, void 0, function () {
                var result, id, responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = new Forum();
                            id = project['id'] || project;
                            return [4 /*yield*/, goodidea.postAsync('api/forum/add', null, {
                                    project: id,
                                    team: teamOnly,
                                    content: content
                                })];
                        case 1:
                            responseJSON = _a.sent();
                            return [2 /*return*/, Forum.loadFromJSON(responseJSON['Result'])];
                    }
                });
            });
        };
        /**
         * 取得指定提案的討論清單
         * @param project 指定提案的ID或Project物件
         * @param teamOnly 是否為團隊訊息(必須為團隊成員)
         */
        Forum.getForumList = function (project, teamOnly) {
            return __awaiter(this, void 0, void 0, function () {
                var id, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = project['id'] || project;
                            result = new goodidea.PageResult(goodidea.Forum);
                            result.url = 'api/forum/list';
                            result.length = 10;
                            result.params = {
                                project: id,
                                team: teamOnly
                            };
                            return [4 /*yield*/, result.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 由JSON資料產生Forum
         * @param data 資料來源
         */
        Forum.loadFromJSON = function (data) {
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
        };
        return Forum;
    }());
    goodidea.Forum = Forum;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var KeyValue = (function () {
        function KeyValue() {
        }
        KeyValue.loadFromJSON = function (data) {
            var result = new KeyValue();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function)
                    continue;
                result[fields[i].toLowerCase()] = data[fields[i]];
            }
            return result;
        };
        return KeyValue;
    }());
    goodidea.KeyValue = KeyValue;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var Link = (function () {
        function Link() {
        }
        /**
         * 由JSON資料產生Link
         * @param data 資料來源
         */
        Link.loadFromJSON = function (data) {
            var result = new Link();
            result.id = data['Id'];
            result.name = data['Name'];
            result.url = data['Url'];
            return result;
        };
        /**
         * 取得相關連結列表
         */
        Link.getLinkList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/link/list')];
                        case 1:
                            responseJSON = _a.sent();
                            result = [];
                            for (i = 0; i < responseJSON['Result'].length; i++) {
                                result.push(Link.loadFromJSON(responseJSON['Result'][i]));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return Link;
    }());
    goodidea.Link = Link;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    /**
     * markdown章節剖析
     */
    var MarkdownSegment = (function () {
        function MarkdownSegment(content) {
            this.content = content;
            this.level = 0;
        }
        MarkdownSegment.prototype.getSegments = function () {
            var _this = this;
            var temp = MarkdownSegment.parse(this.content);
            if (temp == null)
                return [];
            return temp.map(function (x) {
                x.level = _this.level + 1;
                return x;
            });
        };
        MarkdownSegment.parse = function (content, level) {
            if (!level)
                level = 1;
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
        };
        return MarkdownSegment;
    }());
    goodidea.MarkdownSegment = MarkdownSegment;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var MemberRequest = (function () {
        function MemberRequest() {
        }
        /**
         * 由JSON資料產生MemberRequest
         * @param data 資料來源
         */
        MemberRequest.loadFromJSON = function (data) {
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
        };
        /**
         * 新增需求技能
         * @param specialty 技能字串
         */
        MemberRequest.prototype.addSpecialty = function (specialty) {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/addMemberSpecialty', null, { memberRequest: this.id, specialty: specialty })];
                        case 1:
                            responseJSON = _a.sent();
                            this.specialty.push(goodidea.MemberRequestSpecialty.loadFromJSON(responseJSON['Result']));
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 移除指定技能需求
         * @param specialty 指定技能之ID或MemberSpecialty物件
         */
        MemberRequest.prototype.removeSpecialty = function (specialty) {
            return __awaiter(this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = specialty['id'] || specialty;
                            return [4 /*yield*/, goodidea.postAsync('api/project/removeMemberSpecialty', null, { specialty: id })];
                        case 1:
                            _a.sent();
                            this.specialty = this.specialty.filter(function (x) { return x.id != id; });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 使用目前登入使用者應徵
         */
        MemberRequest.prototype.joinMemberRequest = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/JoinMemberResponse', null, { memberRequest: this.id })];
                        case 1:
                            _a.sent();
                            this.sent = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 將目前登入使用者脫離該應徵
         */
        MemberRequest.prototype.quitMemberRequest = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/QuitMemberResponse', null, { memberRequest: this.id })];
                        case 1:
                            _a.sent();
                            this.sent = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 取得應徵人員名單
         */
        MemberRequest.prototype.getMemberResponseList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var responseJSON, memberRequest;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/MemberResponseList', null, { project: this.projectId })];
                        case 1:
                            responseJSON = _a.sent();
                            memberRequest = responseJSON['Result'].filter(function (x) { return x['Id'] == _this.id; })[0];
                            return [2 /*return*/, memberRequest['MemberResponse'].map(function (x) { return goodidea.User.loadFromJSON(x['User']); })];
                    }
                });
            });
        };
        /**
         * 將指定使用者抽離應徵人員清單
         */
        MemberRequest.prototype.removeMemberResponse = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = user['id'] || user;
                            return [4 /*yield*/, goodidea.postAsync('api/project/RemoveMemberResponse', null, {
                                    memberRequest: this.id,
                                    user: id
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MemberRequest;
    }());
    goodidea.MemberRequest = MemberRequest;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var MemberRequestSpecialty = (function () {
        function MemberRequestSpecialty() {
        }
        /**
         * 由JSON資料產生MemberRequestSpecialty
         * @param data 資料來源
         */
        MemberRequestSpecialty.loadFromJSON = function (data) {
            var result = new MemberRequestSpecialty();
            result.id = data['Id'];
            result.value = data['Value'];
            return result;
        };
        return MemberRequestSpecialty;
    }());
    goodidea.MemberRequestSpecialty = MemberRequestSpecialty;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var News = (function () {
        function News() {
        }
        /**
         * 透過最新消息Id取得最新消息
         * @param id 最新消息Id
         */
        News.getNewsById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/news/get', null, {
                                news: id
                            })];
                        case 1:
                            responseJSON = _a.sent();
                            return [2 /*return*/, News.loadFromJSON(responseJSON['Result'])];
                    }
                });
            });
        };
        /**
         * 由JSON資料產生News
         * @param data 資料來源
         */
        News.loadFromJSON = function (data) {
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
        };
        /**
         * 取得最新消息分頁列表
         */
        News.getNewsList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = new goodidea.PageResult(goodidea.News);
                            result.length = 5;
                            result.url = 'api/news/list';
                            return [4 /*yield*/, result.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return News;
    }());
    goodidea.News = News;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var PageResult = (function () {
        /**
         * 建構分頁查詢結果
         * @param type 結果類型
         */
        function PageResult(type) {
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
        PageResult.prototype.hasNext = function () {
            return this.index + this.length < this.count;
        };
        /*
         * 讀取查詢結果
         */
        PageResult.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, key, responseJSON, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = {
                                index: this.index,
                                length: this.length
                            };
                            for (key in this.params)
                                data[key] = this.params[key];
                            return [4 /*yield*/, goodidea.postAsync(this.url, null, data)];
                        case 1:
                            responseJSON = _a.sent();
                            this.count = responseJSON['Count'];
                            this.result = [];
                            for (i = 0; i < responseJSON['Result'].length; i++) {
                                this.result.push(this.type['loadFromJSON'](responseJSON['Result'][i]));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /*
         * 取得下一頁查詢結果
         */
        PageResult.prototype.nextPage = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = new PageResult(this.type);
                            result.index = this.index + this.length;
                            result.length = this.length;
                            result.params = this.params;
                            result.url = this.url;
                            return [4 /*yield*/, result.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 由JSON資料產生PageResult
         * @param data 資料來源
         */
        PageResult.loadFromJSON = function (type, data) {
            var result = new PageResult(type);
            result.result = [];
            for (var i = 0; i < data['Result'].length; i++) {
                result.result.push(type['loadFromJSON'](data['Result'][i]));
            }
            return result;
        };
        return PageResult;
    }());
    goodidea.PageResult = PageResult;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var OrderBy;
    (function (OrderBy) {
        OrderBy[OrderBy["lastEditTime"] = 0] = "lastEditTime";
        OrderBy[OrderBy["name"] = 1] = "name";
        OrderBy[OrderBy["class"] = 2] = "class";
        OrderBy[OrderBy["views"] = 3] = "views";
        OrderBy[OrderBy["votes"] = 4] = "votes";
        OrderBy[OrderBy["awardsFirst"] = 5] = "awardsFirst";
    })(OrderBy = goodidea.OrderBy || (goodidea.OrderBy = {}));
    var Project = (function () {
        function Project() {
            /**
             * 取得提案夾帶的檔案
             */
            this.files = [];
        }
        /**
         * 讀取提案內容
         */
        Project.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var temp, fields, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Project.getProjectById(this.id)];
                        case 1:
                            temp = _a.sent();
                            fields = getKeys(temp);
                            for (i = 0; i < fields.length; i++) {
                                if (temp[fields[i]] instanceof Function)
                                    continue;
                                this[fields[i]] = temp[fields[i]];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 取得提案Markdown的章節剖析物件
         */
        Project.prototype.getContentSegments = function () {
            return new goodidea.MarkdownSegment(this.content);
        };
        /**
         * 更新提案
         */
        Project.prototype.update = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/update', null, {
                                project: this.id,
                                name: this.name,
                                "class": this["class"].id,
                                content: this.content,
                                isPublish: this.isPublish,
                                teamName: this.team.name
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新提案內容
         */
        Project.prototype.updateContent = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/update', null, {
                                project: this.id,
                                content: this.content
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        //#region 細部更新操作
        /**
         * 更新提案隊伍名稱
         */
        Project.prototype.updateTeamName = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/update', null, {
                                project: this.id,
                                teamName: this.team.name
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新提案名稱
         */
        Project.prototype.updateName = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/update', null, {
                                project: this.id,
                                name: this.name
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新提案類別
         */
        Project.prototype.updateClass = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/update', null, {
                                project: this.id,
                                "class": this["class"].id
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新提案公開狀態
         */
        Project.prototype.updatePublish = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/update', null, {
                                project: this.id,
                                isPublish: this.isPublish
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        //#endregion
        /**
         * 加入新的團隊成員
         * @param user 團隊成員的ID或User物件
         * @param memberType 團隊成員類型
         */
        Project.prototype.addMember = function (user, memberType) {
            return __awaiter(this, void 0, void 0, function () {
                var id, data, responseJSON, member;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = user['id'] || user;
                            data = {
                                project: this.id,
                                user: id,
                                isTeacher: memberType != goodidea.MemberType.member,
                                isAssistant: memberType == goodidea.MemberType.assistant
                            };
                            return [4 /*yield*/, goodidea.postAsync('api/project/addmember', null, data)];
                        case 1:
                            responseJSON = _a.sent();
                            member = goodidea.TeamMember.loadFromJSON(responseJSON['Result']);
                            this.team.group.push(member);
                            return [2 /*return*/, member];
                    }
                });
            });
        };
        /**
         * 剔除團隊成員
         * @param member 團隊成員的ID或TeamMember、User物件
         */
        Project.prototype.removeMember = function (member) {
            return __awaiter(this, void 0, void 0, function () {
                var id, responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = member['user']['id'] || member['id'] || member;
                            return [4 /*yield*/, goodidea.postAsync('api/project/removemember', null, { project: this.id, user: id })];
                        case 1:
                            responseJSON = _a.sent();
                            this.team.group = this.team.group.filter(function (x) { return x.user.id != id; });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 加入新的團隊成員需求
         * @param isTeacher 是否為指導教授
         * @param specialty 專長需求集合
         */
        Project.prototype.addMemberRequest = function (isTeacher, specialty) {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, _a, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!specialty) return [3 /*break*/, 2];
                            return [4 /*yield*/, goodidea.postAsync('api/project/addMemberRequest', null, {
                                    project: this.id,
                                    isTeacher: isTeacher,
                                    specialty: specialty.join(",")
                                })];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, goodidea.postAsync('api/project/addMemberRequest', null, {
                                project: this.id,
                                isTeacher: isTeacher
                            })];
                        case 3:
                            _a = _b.sent();
                            _b.label = 4;
                        case 4:
                            responseJSON = _a;
                            result = goodidea.MemberRequest.loadFromJSON(responseJSON['Result']);
                            if (!this.memberRequest)
                                this.memberRequest = [];
                            this.memberRequest.push(result);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        Project.prototype.removeMemberRequest = function (memberRequest) {
            return __awaiter(this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = memberRequest['id'] || memberRequest;
                            return [4 /*yield*/, goodidea.postAsync('api/project/removeMemberRequest', null, {
                                    request: id
                                })];
                        case 1:
                            _a.sent();
                            if (!this.memberRequest)
                                return [2 /*return*/];
                            this.memberRequest = this.memberRequest.filter(function (x) { return x.id != id; });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 上傳相關文件
         * @param name 檔案名稱
         * @param file 檔案
         */
        Project.prototype.uploadFile = function (name, file) {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/addfile', null, { project: this.id, file: file, name: name })];
                        case 1:
                            responseJSON = _a.sent();
                            result = goodidea.DocumentInfo.loadFromJSON(responseJSON['Result']);
                            this.files.push(goodidea.DocumentInfo.loadFromJSON(responseJSON['Result']));
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 刪除相關文件
         * @param doc 檔案ID或DocumentInfo物件
         */
        Project.prototype.deleteFile = function (doc) {
            return __awaiter(this, void 0, void 0, function () {
                var id, responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = doc['id'] || doc;
                            return [4 /*yield*/, goodidea.postAsync('api/project/removefile', null, { file: id })];
                        case 1:
                            responseJSON = _a.sent();
                            this.files = this.files.filter(function (x) { return x.id != id; });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 上傳封面
         * @param file 封面檔案
         */
        Project.prototype.uploadCover = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/update', null, { project: this.id, cover: file })];
                        case 1:
                            responseJSON = _a.sent();
                            result = goodidea.FileInfo.loadFromJSON(responseJSON['Result']['Cover']);
                            this.cover = result;
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 參加指定競賽
         * @param competition 指定競賽的ID或Competition物件
         */
        Project.prototype.joinCompetition = function (competition) {
            return __awaiter(this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = competition['id'] || competition;
                            return [4 /*yield*/, goodidea.postAsync('api/project/joinCompetition', null, {
                                    project: this.id,
                                    competition: id
                                })];
                        case 1:
                            _a.sent();
                            this.load(); //reload Project
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 投票並回傳剩餘票數
         */
        Project.prototype.vote = function () {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/vote', null, {
                                project: this.id
                            })];
                        case 1:
                            responseJSON = _a.sent();
                            return [2 /*return*/, responseJSON['Result']['Quota']];
                    }
                });
            });
        };
        /**
         * 複製目前提案
         * @param name 新的提案名稱
         */
        Project.prototype.clone = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var data, responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = { project: this.id };
                            if (name)
                                data['name'] = name;
                            return [4 /*yield*/, goodidea.postAsync('api/project/clone', null, data)];
                        case 1:
                            responseJSON = _a.sent();
                            return [2 /*return*/, Project.loadFromJSON(responseJSON['Result'])];
                    }
                });
            });
        };
        /**
         * 刪除目前專案
         */
        Project.prototype["delete"] = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/delete', null, { project: this.id })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 取得目前提案的編輯紀錄
         */
        Project.prototype.getProjectUpdateLogList = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.ProjectUpdateLog.getUpdateLogs(this)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * 新增提案
         * @param name 提案名稱
         * @param _class 提案分類ID或Class物件
         * @param temp 提案競賽樣板，競賽ID或Competition物件
         */
        Project.create = function (name, _class, temp) {
            return __awaiter(this, void 0, void 0, function () {
                var data, responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = {
                                name: name,
                                "class": _class['id'] || _class
                            };
                            if (temp)
                                data['competition'] = temp['id'] || temp;
                            return [4 /*yield*/, goodidea.postAsync('api/project/add', null, data)];
                        case 1:
                            responseJSON = _a.sent();
                            return [2 /*return*/, Project.loadFromJSON(responseJSON['Result'])];
                    }
                });
            });
        };
        /**
         * 由JSON資料產生Project
         * @param data 資料來源
         */
        Project.loadFromJSON = function (data) {
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
                result["class"] = goodidea.Class.loadFromJSON(data['Class']);
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
        };
        /**
         * 取得指定使用者ID或User物件對象所有提案
         * @param user 指定使用者
         */
        Project.getUserProjects = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var id, responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = user['id'] || user;
                            return [4 /*yield*/, goodidea.postAsync('api/project/userlist', null, { id: id })];
                        case 1:
                            responseJSON = _a.sent();
                            return [2 /*return*/, goodidea.UserProjectList.loadFromJSON(responseJSON['Result'])];
                    }
                });
            });
        };
        /**
         * 取得指定使用者所有提案
         * @param id 指定使用者ID
         */
        Project.getProjectById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/get', null, { project: id })];
                        case 1:
                            responseJSON = _a.sent();
                            return [2 /*return*/, Project.loadFromJSON(responseJSON['Result'])];
                    }
                });
            });
        };
        /**
         * 取得目前登入使用者的所有提案
         */
        Project.getLoginUserProjects = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, Project.getUserProjects("me")];
                });
            });
        };
        /**
         * 取得目前系統中公開提案清單
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        Project.getProjectList = function (_class, competition, order) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, Project.search(null, _class, competition, order)];
                });
            });
        };
        /**
         * 取得目前系統中有徵人公開提案清單
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        Project.getRequestProjectList = function (keyword, _class, order) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = new goodidea.PageResult(goodidea.Project);
                            result.url = 'api/project/requestList';
                            result.params = {
                                q: keyword,
                                "class": _class ? (_class.id || _class) : 'N',
                                order: OrderBy[order]
                            };
                            result.length = 10;
                            return [4 /*yield*/, result.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 搜尋目前系統中公開提案
         * @param keyword 關鍵字
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        Project.search = function (keyword, _class, competition, order) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = new goodidea.PageResult(goodidea.Project);
                            result.url = 'api/project/list';
                            result.params = {
                                "class": _class ? (_class.id || _class) : 'N',
                                competition: competition ? (competition.id || competition) : 'N',
                                order: OrderBy[order]
                            };
                            if (keyword != null) {
                                result.url = 'api/project/search';
                                result.params['q'] = keyword;
                            }
                            result.length = 10;
                            return [4 /*yield*/, result.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return Project;
    }());
    goodidea.Project = Project;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var ProjectUpdateLog = (function () {
        function ProjectUpdateLog() {
        }
        /**
         * 取得提案
         */
        ProjectUpdateLog.prototype.getProject = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, goodidea.Project.getProjectById(this.projectId)];
                });
            });
        };
        /**
         * 取得指定提案更新紀錄分頁列表
         * @param project 提案
         */
        ProjectUpdateLog.getUpdateLogs = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = new goodidea.PageResult(ProjectUpdateLog);
                            result.url = 'api/project/updateLogs';
                            result.params = {
                                project: project['id'] || project
                            };
                            result.length = 10;
                            return [4 /*yield*/, result.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 使用Id取得指定提案更新紀錄
         * @param Id
         */
        ProjectUpdateLog.getUpdateLogById = function (project, id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/project/GetUpdateLog', null, {
                                project: project['id'] || project,
                                log: id
                            })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, ProjectUpdateLog.loadFromJSON(data['Result'])];
                    }
                });
            });
        };
        /**
         * 由JSON資料產生ProjectUpdateLog
         * @param data 資料來源
         */
        ProjectUpdateLog.loadFromJSON = function (data) {
            var result = new ProjectUpdateLog();
            result.id = data['Id'];
            result.user = goodidea.User.loadFromJSON(data['User']);
            result.content = data['Content'];
            result.time = new Date(data['Time']);
            result.projectId = data['ProjectId'];
            return result;
        };
        return ProjectUpdateLog;
    }());
    goodidea.ProjectUpdateLog = ProjectUpdateLog;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    goodidea.host = "http://goodidea.nkfust.edu.tw/";
    goodidea.origin = "http://goodidea.nkfust.edu.tw/";
    goodidea.version = "1.0.1";
    function postAsync(url, header, data, disableException, user, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, _a, _b, exception, key;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        request = new nativeExtensions.HttpClient();
                        request.withCredentials = true;
                        url = goodidea.host + url;
                        if (!data)
                            data = {};
                        data['origin'] = goodidea.origin;
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, request.postAsync(url, header, data, user, password, progressCallback)];
                    case 1:
                        response = _b.apply(_a, [(_c.sent()).resultText]);
                        if (!response.Success && !disableException) {
                            exception = {};
                            for (key in response.Result)
                                exception[firstToLowerCase(key)] = response.Result[key];
                            if (goodidea.onException)
                                goodidea.onException(exception);
                            throw exception;
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    }
    goodidea.postAsync = postAsync;
    function getServerDate() {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postAsync('api/user/checklogin', null, null, true)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new Date(response['Time'] - new Date().getTimezoneOffset() * 60 * 1000)];
                }
            });
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
    var Team = (function () {
        function Team() {
            /**
             * �ζ��������T
             */
            this.group = [];
        }
        /**
         * ��JSON���Ʋ���Team
         * @param data ���ƨӷ�
         */
        Team.loadFromJSON = function (data) {
            var result = new Team();
            result.name = data['Name'];
            result.group = [];
            for (var i = 0; i < data['Group'].length; i++) {
                result.group.push(goodidea.TeamMember.loadFromJSON(data['Group'][i]));
            }
            return result;
        };
        return Team;
    }());
    goodidea.Team = Team;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var MemberType;
    (function (MemberType) {
        MemberType[MemberType["teacher"] = 0] = "teacher";
        MemberType[MemberType["assistant"] = 1] = "assistant";
        MemberType[MemberType["member"] = 2] = "member";
    })(MemberType = goodidea.MemberType || (goodidea.MemberType = {}));
    var TeamMember = (function () {
        function TeamMember() {
        }
        /**
         * ���o�γ]�w�ζ���������
         */
        TeamMember.prototype.getMemberType = function () {
            if (!this.isTeacher)
                return MemberType.member;
            return this.isAssistant ? MemberType.assistant : MemberType.teacher;
        };
        TeamMember.prototype.setMemberType = function (value) {
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
        };
        /**
         * ��JSON��Ʋ���TeamMember
         * @param data ��ƨӷ�
         */
        TeamMember.loadFromJSON = function (data) {
            var result = new TeamMember();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                result[goodidea.firstToLowerCase(fields[i])] = data[fields[i]];
            }
            result.user = goodidea.User.loadFromJSON(data['User']);
            return result;
        };
        return TeamMember;
    }());
    goodidea.TeamMember = TeamMember;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var TimeRange = (function () {
        function TimeRange() {
        }
        /**
         * 由JSON資料產生TimeRange
         * @param data 資料來源
         */
        TimeRange.loadFromJSON = function (data) {
            if (data == null)
                return null;
            var result = new TimeRange();
            result.start = new Date(data['Start']);
            result.end = new Date(data['End']);
            return result;
        };
        return TimeRange;
    }());
    goodidea.TimeRange = TimeRange;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var User = (function () {
        function User() {
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
        User.loadFromJSON = function (data) {
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
        };
        /**
         * 讀取使用者資料
         */
        User.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, user, fields, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/user/about', null, {
                                id: this.id
                            }, true)];
                        case 1:
                            responseJSON = _a.sent();
                            if (!responseJSON['Success'])
                                return [2 /*return*/];
                            return [4 /*yield*/, User.loadFromJSON(responseJSON['Result'])];
                        case 2:
                            user = _a.sent();
                            fields = getKeys(user);
                            for (i = 0; i < fields.length; i++) {
                                this[fields[i]] = user[fields[i]];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        //#region 專長
        /**
         * 新增使用者專長
         * @param value 專長
         */
        User.prototype.addSpecialty = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/user/AddSpecialty', null, {
                                Specialty: value
                            })];
                        case 1:
                            responseJSON = _a.sent();
                            result = goodidea.KeyValue.loadFromJSON(responseJSON['Result']);
                            this.specialty.push(result);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 移除使用者專長
         * @param value 專長Id或物件
         */
        User.prototype.removeSpecialty = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = null;
                            if (value['id']) {
                                id = value['id'];
                            }
                            else {
                                id = this.specialty.filter(function (x) { return x.value == value; }).first().id;
                            }
                            return [4 /*yield*/, goodidea.postAsync('api/user/RemoveSpecialty', null, {
                                    Specialty: id
                                })];
                        case 1:
                            _a.sent();
                            this.specialty = this.specialty.filter(function (x) { return x.id != id; });
                            return [2 /*return*/];
                    }
                });
            });
        };
        //#endregion
        /**
         * 上傳目前用戶照片
         * @param file
         */
        User.prototype.uploadPhoto = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var responseJSON, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/user/update', null, { Photo: file })];
                        case 1:
                            responseJSON = _a.sent();
                            user = User.loadFromJSON(responseJSON['Result']);
                            this.photo = user.photo;
                            return [2 /*return*/, this.photo];
                    }
                });
            });
        };
        /**
         * 更新使用者資訊
         */
        User.prototype.update = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = {
                                name: this.name,
                                email: this.email,
                                phone: this.phone,
                                department: this.department.id,
                                information: this.information
                            };
                            if (this.department) {
                                data['department'] = this.department.id;
                            }
                            return [4 /*yield*/, goodidea.postAsync('api/user/update', null, data)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新使用者自我介紹
         */
        User.prototype.updateInformation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = {
                                information: this.information
                            };
                            return [4 /*yield*/, goodidea.postAsync('api/user/update', null, data)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新使用者除自我介紹外的資料
         */
        User.prototype.updateWithoutInformation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = {
                                name: this.name,
                                email: this.email,
                                phone: this.phone,
                                department: this.department.id
                            };
                            return [4 /*yield*/, goodidea.postAsync('api/user/update', null, data)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        //#endregion
        //#region Facebook串聯
        /**
         * 串聯Facebook帳號
         * @param token Facebook權杖
         */
        User.prototype.connectFB = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/user/linkFB', null, {
                                token: token
                            })];
                        case 1:
                            _a.sent();
                            this.isLinkFB = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 取消串聯Facebook帳號
         */
        User.prototype.unconnectFB = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/user/unlinkfb')];
                        case 1:
                            _a.sent();
                            this.isLinkFB = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        //#endregion
        //#region 帳號狀態
        /**
         * 使用Facebook權杖登入
         * @param fbToken Facebook權杖
         */
        User.fblogin = function (fbToken) {
            return __awaiter(this, void 0, void 0, function () {
                var apiPath, postData, responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            apiPath = "api/user/fblogin";
                            postData = {
                                token: fbToken
                            };
                            return [4 /*yield*/, goodidea.postAsync(apiPath, null, postData)];
                        case 1:
                            responseJSON = _a.sent();
                            return [4 /*yield*/, User.getUserById(responseJSON['Result'].Id)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * 使用學校信箱登入
         * @param id 帳號
         * @param password 密碼
         */
        User.login = function (id, password) {
            return __awaiter(this, void 0, void 0, function () {
                var apiPath, postData, responseJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            apiPath = "api/user/login";
                            postData = {
                                id: id,
                                pwd: password
                            };
                            return [4 /*yield*/, goodidea.postAsync(apiPath, null, postData)];
                        case 1:
                            responseJSON = _a.sent();
                            return [4 /*yield*/, User.getUserById(responseJSON['Result'].Id)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * 登出系統
         */
        User.logout = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/user/logout')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 取得目前登入使用者資訊
         */
        User.getLoginUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, goodidea.postAsync('api/user/checklogin', null, null, true)];
                        case 1:
                            response = _a.sent();
                            if (response['Result'] == null || response['Result']['IsAdmin'])
                                return [2 /*return*/, null];
                            return [4 /*yield*/, User.getUserById(response['Result'].Id)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        //#endregion
        /**
         * 取得指定使用者相關資訊
         */
        User.getUserById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = new User();
                            result.id = id;
                            return [4 /*yield*/, result.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return User;
    }());
    goodidea.User = User;
})(goodidea || (goodidea = {}));
var goodidea;
(function (goodidea) {
    var UserProjectList = (function () {
        function UserProjectList() {
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
        UserProjectList.loadFromJSON = function (data) {
            var result = new UserProjectList();
            for (var i = 0; i < data['Own'].length; i++) {
                result.own.push(goodidea.Project.loadFromJSON(data['Own'][i]));
            }
            for (var i = 0; i < data['Participate'].length; i++) {
                result.participate.push(goodidea.Project.loadFromJSON(data['Participate'][i]));
            }
            return result;
        };
        return UserProjectList;
    }());
    goodidea.UserProjectList = UserProjectList;
})(goodidea || (goodidea = {}));
//# sourceMappingURL=goodideaLib.js.map