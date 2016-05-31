module goodidea {
    export class MemberRequest {
        public projectId: string;

        public id: string;
        
        /**
         * 取得是否應徵對象為老師
         */
        public isTeacher: boolean;

        /**
         * 取得應徵人數
         */
        public responseCount: number;

        /**
         * 目前登入使用者是否已經應徵
         */
        public sent: boolean;

        /**
         * 取得所需技能
         */
        public specialty: MemberRequestSpecialty[];

        /**
         * 由JSON資料產生MemberRequest
         * @param data 資料來源
         */
        public static loadFromJSON(data: JSON): MemberRequest {
            var result = new MemberRequest();
            var fields = getKeys(data);
            for (var i = 0; i < fields.length; i++) {
                if (data[fields[i]] instanceof Function) continue;
                result[firstToLowerCase(fields[i])] = data[fields[i]];
            }

            result.specialty = [];
            for (var i = 0; i < data['Specialty'].length; i++) {
                result.specialty.push(MemberRequestSpecialty.loadFromJSON(data['Specialty'][i]));
            }
            
            return result;
        }

        /**
         * 新增需求技能
         * @param specialty 技能字串
         */
        public async addSpecialty(specialty: string): Promise<void> {
            var responseJSON = await postAsync('api/project/addMemberSpecialty', null, { memberRequest: this.id, specialty: specialty });
            this.specialty.push(MemberRequestSpecialty.loadFromJSON(responseJSON['Result']));
        }

        /**
         * 移除指定技能需求
         * @param specialty 指定技能之ID或MemberSpecialty物件
         */
        public async removeSpecialty(specialty: string | MemberRequestSpecialty): Promise<void> {
            var id = specialty['id'] || specialty;
            await postAsync('api/project/removeMemberSpecialty', null, { specialty: id });

            this.specialty = this.specialty.filter(x => x.id != id);
        }

        /**
         * 使用目前登入使用者應徵
         */
        public async joinMemberRequest(): Promise<void> {
            await postAsync('api/project/JoinMemberResponse', null, { memberRequest: this.id });
            this.sent = true;
        }

        /**
         * 將目前登入使用者脫離該應徵
         */
        public async quitMemberRequest(): Promise<void> {
            await postAsync('api/project/QuitMemberResponse', null, { memberRequest: this.id });
            this.sent = false;
        }

        /**
         * 取得應徵人員名單
         */
        public async getMemberResponseList(): Promise<User[]> {
            var responseJSON = await postAsync('api/project/MemberResponseList', null, { project: this.projectId });
            var memberRequest = responseJSON['Result'].filter(x => x['Id'] == this.id)[0];
            return memberRequest['MemberResponse'].map(x => User.loadFromJSON(x['User']));
        }

        /**
         * 將指定使用者抽離應徵人員清單
         */
        public async removeMemberResponse(user: string | User): Promise<void> {
            var id = user['id'] || user;
            await postAsync('api/project/RemoveMemberResponse', null, {
                memberRequest: this.id,
                user: id
            });
        }
    }
}