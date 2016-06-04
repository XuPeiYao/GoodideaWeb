module goodidea {
    export var host: string = "http://goodidea.nkfust.edu.tw/";
    export var origin: string = "http://goodidea.nkfust.edu.tw/";
    export var version: string = "1.0.1";
    export var onException: (exception: any) => void;
    export async function postAsync(url: string, header?: any, data?: (FormData | String | Object), disableException? : boolean, user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<JSON> {
        var request = new nativeExtensions.HttpClient();
        request.withCredentials = true;
        url = host + url;

        if (!data) data = {};
        data['origin'] = origin;

        var response: any = JSON.parse((await request.postAsync(url, header, data, user, password, progressCallback)).resultText);
        if (!response.Success && !disableException) {
            var exception = {};
            for (var key in response.Result) exception[firstToLowerCase(key)] = response.Result[key];
            if (onException) onException(exception);
            throw exception;
        }
        return response;
    }

    export async function getServerDate(): Promise<Date> {
        var response = await postAsync('api/user/checklogin', null, null, true);
        return new Date(response['Time'] - new Date().getTimezoneOffset() * 60 * 1000);
    }

    export function firstToLowerCase(input: string): string {
        return input[0].toLowerCase() + input.substring(1);
    }
}