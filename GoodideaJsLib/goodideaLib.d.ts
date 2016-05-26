declare module goodidea {
    class Banner {
        id: string;
        url: string;
        static loadFromJSON(data: JSON): Banner;
        static getBannerList(): Promise<Banner[]>;
    }
}
declare module goodidea {
    class Class {
        id: string;
        name: string;
        static loadFromJSON(data: JSON): Class;
        static getClassList(): Promise<Class[]>;
    }
}
declare module goodidea {
    class College {
        id: string;
        name: string;
        static loadFromJSON(data: JSON): College;
    }
}
declare module goodidea {
    class Competition {
        id: string;
        name: string;
        userVotes: number;
        publishOnSubmit: boolean;
        needTeacher: boolean;
        maxMember: number;
        minMember: number;
        repeatCount: number;
        template: number;
        condition: Class[];
        static loadFromJSON(data: JSON): Competition;
        static getCompetitionList(active: boolean, vote: boolean): Promise<Competition[]>;
        static getLoginUserQuota(competition: string | Competition): Promise<number>;
    }
}
declare module goodidea {
    class Course {
        id: string;
        year: number;
        semester: number;
        cId: string;
        cName: string;
        teacherName: string;
        teacherEmail: string;
        static loadFromJSON(data: JSON): Course;
        static getCourseList(): Promise<Course[]>;
    }
}
declare module goodidea {
    class Department {
        collegeId: string;
        id: string;
        name: string;
        college: College;
        static loadFromJSON(data: JSON): Department;
        /**
         * 取得所有系所陣列
         */
        static getDepartmentList(): Promise<Department[]>;
    }
}
declare module goodidea {
    class DocumentInfo {
        id: string;
        name: string;
        file: FileInfo;
        static loadFromJSON(data: JSON): DocumentInfo;
    }
}
declare module goodidea {
    enum FileType {
        Document = 0,
        Image = 1,
    }
    class FileInfo {
        /**
         * 取得檔案Id
         */
        id: string;
        /**
         * 取得檔案副檔名
         */
        ext: string;
        /**
         * 取得檔案名稱
         */
        name: string;
        /**
         * 取得檔案路徑
         */
        path: string;
        /**
         * 取得檔案大小
         */
        size: number;
        /**
         * 取得檔案類型
         */
        type: FileType;
        /**
         * 取得檔案超連結
         */
        url: string;
        static loadFromJSON(data: JSON): FileInfo;
    }
}
declare module goodidea {
    class Forum {
        id: string;
        editable: boolean;
        time: Date;
        groupOnly: boolean;
        content: string;
        user: User;
        /**
         * 刪除這個討論
         */
        static remove(forum: Forum): Promise<void>;
        /**
         * 建立新的討論
         * @param project 目標提案的ID或Project物件
         * @param teamOnly 是否僅團隊可見(必須為團隊成員)
         * @param content 內容
         */
        static createForum(project: Project | string, teamOnly: boolean, content: string): Promise<Forum>;
        /**
         * 取得指定提案的討論清單
         * @param project 指定提案的ID或Project物件
         * @param teamOnly 是否為團隊訊息(必須為團隊成員)
         */
        static getForumList(project: Project | string, teamOnly: boolean): Promise<PageResult<Forum>>;
        static loadFromJSON(data: JSON): Forum;
    }
}
declare module goodidea {
    class KeyValue {
        id: string;
        value: string;
        static loadFromJSON(data: JSON): KeyValue;
    }
}
declare module goodidea {
    class Link {
        id: string;
        name: string;
        url: string;
        static loadFromJSON(data: JSON): Link;
        static getLinkList(): Promise<Link[]>;
    }
}
declare module goodidea {
    /**
     * markdown章節剖析
     */
    class MarkdownSegment {
        level: number;
        title: string;
        content: string;
        private contentIndex;
        constructor(content: string);
        segments: MarkdownSegment[];
        static parse(content: string, level?: number): MarkdownSegment[];
    }
}
declare module goodidea {
    class MemberRequest {
        projectId: string;
        id: string;
        /**
         * 取得是否應徵對象為老師
         */
        isTeacher: boolean;
        /**
         * 取得應徵人數
         */
        responseCount: number;
        /**
         * 目前登入使用者是否已經應徵
         */
        sent: boolean;
        /**
         * 取得所需技能
         */
        specialty: MemberRequestSpecialty[];
        static loadFromJSON(data: JSON): MemberRequest;
        /**
         * 新增需求技能
         * @param specialty 技能字串
         */
        addSpecialty(specialty: string): Promise<void>;
        /**
         * 移除指定技能需求
         * @param specialty 指定技能之ID或MemberSpecialty物件
         */
        removeSpecialty(specialty: string | MemberRequestSpecialty): Promise<void>;
        /**
         * 使用目前登入使用者應徵
         */
        joinMemberRequest(): Promise<void>;
        /**
         * 將目前登入使用者脫離該應徵
         */
        quitMemberRequest(): Promise<void>;
        /**
         * 取得應徵人員名單
         */
        getMemberResponseList(): Promise<User[]>;
        /**
         * 將指定使用者抽離應徵人員清單
         */
        removeMemberResponse(user: string | User): Promise<void>;
    }
}
declare module goodidea {
    class MemberRequestSpecialty {
        id: string;
        value: string;
        static loadFromJSON(data: JSON): MemberRequestSpecialty;
    }
}
declare module goodidea {
    class News {
        id: string;
        title: string;
        timeString: any;
        time: Date;
        views: number;
        content: string;
        files: DocumentInfo[];
        static getNewsById(id: string): Promise<News>;
        static loadFromJSON(data: JSON): News;
        static getNewsList(): Promise<PageResult<News>>;
    }
}
declare module goodidea {
    class PageResult<T> {
        params: any;
        url: string;
        count: number;
        index: number;
        length: number;
        result: T[];
        private type;
        constructor(type: any);
        hasNext(): boolean;
        load(): Promise<void>;
        nextPage(): Promise<PageResult<T>>;
        static loadFromJSON<T>(type: any, data: JSON): PageResult<T>;
    }
}
declare module goodidea {
    enum OrderBy {
        lastEditTime = 0,
        name = 1,
        class = 2,
        views = 3,
        votes = 4,
        awardsFirst = 5,
    }
    class Project {
        /**
         * 取得提案Id
         */
        id: string;
        /**
         * 取得或設定提案名稱
         */
        name: string;
        /**
         * 取得或設定提案內容
         */
        content: string;
        /**
         * 取得提案得票數
         */
        votes: number;
        /**
         * 取得提案瀏覽人次
         */
        views: number;
        /**
         * 取得或設定提案是否公開
         */
        isPublish: boolean;
        /**
         * 取得提案獎項
         */
        awards: string;
        /**
         * 取得提案夾帶的檔案
         */
        files: DocumentInfo[];
        /**
         * 取得提案成員徵人需求
         */
        memberRequest: MemberRequest[];
        /**
         * 取得標籤(由系統管理員設定)
         */
        hashTag: KeyValue;
        /**
         * 取得提案參與的競賽
         */
        competition: Competition;
        /**
         * 取得參賽編號
         */
        competitionPId: string;
        /**
         * 取得或設定提案分類
         */
        class: Class;
        /**
         * 取得提案封面圖檔
         */
        cover: FileInfo;
        /**
         * 取得提案擁有者資訊
         */
        owner: User;
        /**
         * 取得提案最後編輯時間
         */
        lastEditTime: Date;
        /**
         * 取得提案團隊資訊
         */
        team: Team;
        /**
         * 取得提案摘要
         */
        summary: string;
        /**
         * 是否可編輯
         */
        editable: boolean;
        /**
         * 是否可進行設定
         */
        setable: boolean;
        /**
         * 讀取提案內容
         */
        load(): Promise<void>;
        /**
         * 取得提案Markdown的章節剖析物件
         */
        getContentSegments(): MarkdownSegment;
        /**
         * 更新提案
         */
        update(): Promise<void>;
        /**
         * 更新提案內容
         */
        updateContent(): Promise<void>;
        /**
         * 更新提案隊伍名稱
         */
        updateTeamName(): Promise<void>;
        /**
         * 更新提案名稱
         */
        updateName(): Promise<void>;
        /**
         * 更新提案類別
         */
        updateClass(): Promise<void>;
        /**
         * 更新提案公開狀態
         */
        updatePublish(): Promise<void>;
        /**
         * 加入新的團隊成員
         * @param user 團隊成員的ID或User物件
         * @param memberType 團隊成員類型
         */
        addMember(user: (string | User), memberType: MemberType): Promise<TeamMember>;
        /**
         * 剔除團隊成員
         * @param member 團隊成員的ID或TeamMember、User物件
         */
        removeMember(member: (string | TeamMember | User)): Promise<void>;
        /**
         * 加入新的團隊成員需求
         * @param isTeacher 是否為指導教授
         * @param specialty 專長需求集合
         */
        addMemberRequest(isTeacher: boolean, specialty: string[]): Promise<MemberRequest>;
        removeMemberRequest(memberRequest: string | MemberRequest): Promise<void>;
        /**
         * 上傳相關文件
         * @param name 檔案名稱
         * @param file 檔案
         */
        uploadFile(name: string, file: File): Promise<DocumentInfo>;
        /**
         * 刪除相關文件
         * @param doc 檔案ID或DocumentInfo物件
         */
        deleteFile(doc: (string | DocumentInfo)): Promise<void>;
        /**
         * 上傳封面
         * @param file 封面檔案
         */
        uploadCover(file: File): Promise<FileInfo>;
        /**
         * 參加指定競賽
         * @param competition 指定競賽的ID或Competition物件
         */
        joinCompetition(competition: Competition | string): Promise<void>;
        /**
         * 投票並回傳剩餘票數
         */
        vote(): Promise<number>;
        /**
         * 複製目前提案
         * @param name 新的提案名稱
         */
        clone(name?: string): Promise<Project>;
        /**
         * 刪除目前專案
         */
        delete(): Promise<void>;
        /**
         * 取得目前提案的編輯紀錄
         */
        getProjectUpdateLogList(): Promise<PageResult<ProjectUpdateLog>>;
        /**
         * 新增提案
         * @param name 提案名稱
         * @param _class 提案分類ID或Class物件
         * @param temp 提案競賽樣板，競賽ID或Competition物件
         */
        static create(name: string, _class: (Class | string), temp: (Competition | string)): Promise<Project>;
        static loadFromJSON(data: JSON): Project;
        /**
         * 取得指定使用者ID或User物件對象所有提案
         * @param user 指定使用者
         */
        static getUserProjects(user: (User | string)): Promise<UserProjectList>;
        /**
         * 取得指定使用者所有提案
         * @param id 指定使用者ID
         */
        static getProjectById(id: string): Promise<Project>;
        /**
         * 取得目前登入使用者的所有提案
         */
        static getLoginUserProjects(): Promise<UserProjectList>;
        /**
         * 取得目前系統中公開提案清單
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        static getProjectList(_class: Class, competition: Competition, order: OrderBy): Promise<PageResult<Project>>;
        /**
         * 取得目前系統中有徵人公開提案清單
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        static getRequestProjectList(keyword: string, _class: Class, order: OrderBy): Promise<PageResult<Project>>;
        /**
         * 搜尋目前系統中公開提案
         * @param keyword 關鍵字
         * @param _class 分類
         * @param competition 競賽
         * @param order 排序
         */
        static search(keyword: string, _class: Class, competition: Competition, order: OrderBy): Promise<PageResult<Project>>;
    }
}
declare module goodidea {
    class ProjectUpdateLog {
        id: string;
        user: User;
        content: string;
        time: Date;
        static loadFromJSON(data: JSON): ProjectUpdateLog;
    }
}
declare module goodidea {
    var host: string;
    var origin: string;
    var version: string;
    function postAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<JSON>;
    function firstToLowerCase(input: string): string;
}
declare module goodidea {
    class Team {
        name: string;
        group: TeamMember[];
        static loadFromJSON(data: JSON): Team;
    }
}
declare module goodidea {
    enum MemberType {
        teacher = 0,
        assistant = 1,
        member = 2,
    }
    class TeamMember {
        id: string;
        isTeacher: boolean;
        isAssistant: boolean;
        user: User;
        memberType: MemberType;
        static loadFromJSON(data: JSON): TeamMember;
    }
}
declare module goodidea {
    class User {
        /**
         * 取得使用者id
         */
        id: string;
        /**
         * 取得或設定使用者姓名
         */
        name: string;
        /**
         * 取得或設定使用者學號
         */
        studentId: string;
        /**
         * 取得或設定使用者信箱
         */
        email: string;
        /**
         * 取得或設定使用者手機
         */
        phone: string;
        /**
         * 取得或設定使用者介紹
         */
        information: string;
        /**
         * 取得使用者照片
         */
        photo: FileInfo;
        /**
         * 取得使用者專長
         */
        specialty: KeyValue[];
        /**
         * 取得或設定系所
         */
        department: Department;
        /**
         * 是否連結Facebook
         */
        isLinkFB: boolean;
        static loadFromJSON(data: JSON): User;
        /**
         * 讀取使用者資料
         */
        load(): Promise<void>;
        /**
         * 新增使用者專長
         * @param value 專長
         */
        addSpecialty(value: string): Promise<KeyValue>;
        /**
         * 移除使用者專長
         * @param value 專長Id或物件
         */
        removeSpecialty(value: (string | KeyValue)): Promise<void>;
        /**
         * 上傳目前用戶照片
         * @param file
         */
        uploadPhoto(file: File): Promise<FileInfo>;
        /**
         * 更新使用者資訊
         */
        update(): Promise<void>;
        /**
         * 串聯Facebook帳號
         * @param token Facebook權杖
         */
        connectFB(token: string): Promise<void>;
        /**
         * 取消串聯Facebook帳號
         */
        unconnectFB(): Promise<void>;
        /**
         * 使用Facebook權杖登入
         * @param fbToken Facebook權杖
         */
        static fblogin(fbToken: string): Promise<User>;
        /**
         * 使用學校信箱登入
         * @param id 帳號
         * @param password 密碼
         */
        static login(id: string, password: string): Promise<User>;
        /**
         * 登出系統
         */
        static logout(): Promise<void>;
        /**
         * 取得目前登入使用者資訊
         */
        static getLoginUser(): Promise<User>;
        /**
         * 取得指定使用者相關資訊
         */
        static getUserById(id: string): Promise<User>;
    }
}
declare module goodidea {
    class UserProjectList {
        own: Project[];
        participate: Project[];
        static loadFromJSON(data: JSON): UserProjectList;
    }
}
