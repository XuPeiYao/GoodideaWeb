module goodidea {
    export var host: string = "http://goodidea.nkfust.edu.tw/";
    export var origin: string = "http://goodidea.nkfust.edu.tw/";

    export async function postAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<JSON> {
        var request = new nativeExtensions.HttpClient();

        url = host + url;

        if (!data) data = {};
        data['origin'] = origin;

        var response: any = JSON.parse((await request.postAsync(url, header, data, user, password, progressCallback)).resultText);
        if (!response.Success) throw response.Result;
        return response;
    }
    
    export function firstToLowerCase(input:string):string{
        return input[0].toLowerCase() + input.substring(1);
    }

    //#region 帳號狀態
    /**
     * 使用Facebook權杖登入
     * @param fbToken Facebook權杖
     */
    export async function login(fbToken: string): Promise<User>;

    /**
     * 使用學校信箱登入
     * @param id 帳號
     * @param password 密碼
     */
    export async function login(id: string,password : string): Promise<User>;
    export async function login(id: string, password?: string): Promise<User>{
        var apiPath = "api/user/login";
        var postData : any = {
            id: id,
            pwd: password
        };
        if (!password) {
            apiPath = "api/user/fblogin";
            postData = {
                token: id
            };
        }

        var responseJSON : JSON = await postAsync(apiPath, null, postData);

        return await getUserById(responseJSON['Result'].Id);
    }

    /**
     * 登出系統
     */
    export async function logout(): Promise<void>{
        await postAsync('api/user/logout');
    }

    /**
     * 取得目前登入使用者資訊
     */
    export async function getLoginUser(): Promise<User> {
        var response = await postAsync('api/user/checklogin');
        if (response['Result'] == null) return null;
        return await getUserById(response['Result'].Id);
    }
    //#endregion

    /**
     * 取得指定使用者相關資訊
     */
    export async function getUserById(id: string): Promise<User> {
        var result = new User();
        result.id = id;
        await result.load();
        return result;
    }

    export class User {
        /**
         * 取得使用者id
         */
        public id: string;

        /**
         * 取得或設定使用者姓名
         */
        public name: string;

        /**
         * 取得或設定使用者學號
         */
        public studentId: string;

        /**
         * 取得或設定使用者信箱
         */
        public email: string;

        /**
         * 取得或設定使用者手機
         */
        public phone: string;

        /**
         * 取得或設定使用者介紹
         */
        public information: string;

        /**
         * 取得使用者照片
         */
        public photo: FileInfo;

        /**
         * 取得使用者專長
         */
        public specialty: KeyValue[];

        /**
         * 取得或設定系所
         */
        public department: Department;

        /**
         * 是否連結Facebook
         */
        public isLinkFB: boolean;
        
        //#region 資料更新
        public static loadFromJSON(data: JSON): User {
            var result = new User();
            var fields = data.getKeys();
            for (var i = 0; i < fields.length; i++) {
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }

            var sp = data['Specialty'];
            result.specialty = [];
            for (var i = 0; i < sp.length; i++) {
                if (sp[i]['Id']) {
                    result.specialty.push(KeyValue.loadFromJSON(sp[i]));
                } else {
                    result.specialty.push(sp[i]);
                }
            }

            result.isLinkFB = data['FB'] != null;


            if (data['Photo']) {
                result.photo = FileInfo.loadFromJSON(data['Photo']);
            }
            if (data['Department']) {
                result.department = Department.loadFromJSON(data['Department']);
            }

            return result;
        }


        /**
         * 讀取使用者資料
         */
        public async load(): Promise<void> {
            var responseJSON: JSON = await postAsync('api/user/about', null, {
                id: this.id
            });

            var user = await User.loadFromJSON(responseJSON['Result']);
            var fields = user.getKeys();
            for (var i = 0; i < fields.length; i++) {
                this[fields[i]] = user[fields[i]];
            }
        }

        //#region 專長
        /**
         * 新增使用者專長
         * @param value 專長
         */
        public async addSpecialty(value: string) : Promise<KeyValue> {
            var responseJSON = await postAsync('api/user/AddSpecialty', null, {
                Specialty: value
            });

            var result = KeyValue.loadFromJSON(responseJSON['Result']);
            this.specialty.push(result);
            return result;
        }

        /**
         * 移除使用者專長
         * @param value 專長Id或物件
         */
        public async removeSpecialty(value: (string | KeyValue)): Promise<void> {
            var id = null;
            if (value['id']) {
                id = value['id'];
            } else {
                id = this.specialty.filter(x => x.value == value).first().id;
            }

            await postAsync('api/user/RemoveSpecialty', null, {
                Specialty: id
            });

            this.specialty = this.specialty.filter(x => x.id != id);
        }
        //#endregion

        /**
         * 上傳目前用戶照片
         * @param file
         */
        public async uploadPhoto(file: File): Promise<FileInfo> {
            var responseJSON = await postAsync('api/user/update', null, { Photo: file });
            var photo = FileInfo.loadFromJSON(responseJSON['Result']);

            this.photo = photo;

            return photo;
        }

        /**
         * 更新使用者資訊
         */
        public async update(): Promise<void> {
            var data = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                information: this.information
            };

            if (this.department) {
                data['department'] = this.department.id;
            }

            await postAsync('api/user/update', null, data);
        }
        //#endregion

        //#region Facebook串聯
        /**
         * 串聯Facebook帳號
         * @param token Facebook權杖
         */
        public async connectFB(token: string): Promise<void> {
            await postAsync('api/user/linkFB', null, {
                token: token
            });
            this.isLinkFB = true;
        }

        /**
         * 取消串聯Facebook帳號
         */
        public async unconnectFB(): Promise<void> {
            await postAsync('api/user/unlinkfb');
            this.isLinkFB = false;
        }
        //#endregion
    }
}