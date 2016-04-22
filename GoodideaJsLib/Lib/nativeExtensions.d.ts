interface Array<T> {
    clone(): Array<T>;
    take(count: number): Array<T>;
    takeWhile(fun: (x: T) => boolean): Array<T>;
    takeUntil(fun: (x: T) => boolean): Array<T>;
    skip(count: number): Array<T>;
    skipWhile(fun: (x: T) => boolean): Array<T>;
    skipUntil(fun: (x: T) => boolean): Array<T>;
    first(): T;
    last(): T;
    contains(x: T): boolean;
    distinct(): Array<T>;
    except(ary: Array<T>): Array<T>;
    union(ary: Array<T>): Array<T>;
    intersect(ary: Array<T>): Array<T>;
    sum(fun?: (x: T) => number): number;
    average(fun?: (x: T) => number): number;
    max(fun?: (old: T, next: T) => boolean): T;
    min(fun?: (old: T, next: T) => boolean): T;
}
declare module nativeExtensions {
    class HttpClient {
        requestHeader: any;
        withCredentials: boolean;
        progressCallback: (event: ProgressEvent) => any;
        user: string;
        password: string;
        private openAndSend(method, url, header?, data?, user?, password?, progressCallback?);
        getAsync(url: string, header?: any, user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse>;
        postAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse>;
        putAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse>;
        deleteAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse>;
    }
    class HttpResponse {
        statusCode: number;
        header: any;
        resultType: string;
        resultText: string;
        resultXML: Document;
        result: any;
    }
}
declare var HttpClient: typeof nativeExtensions.HttpClient;
declare function include(): Promise<void>;
interface Math {
    uuid(): string;
}
interface NodeList {
    toArray<T>(): Array<T>;
}
interface Object {
    getKeys(): Array<any>;
    getValues(): Array<any>;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    toArray(): Array<any>;
}
declare function parseHTML(htmlString: string): HTMLDocument;
declare function parseXML(xmlString: string): HTMLDocument;
declare function parseNode(nodeString: string): Node;
declare function typeOf(obj: any): string;