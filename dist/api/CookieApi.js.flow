// @flow
import cookie from 'cookie';
import Api from 'rest-api-handler/src/Api';

class CookieApi<ResponseType> extends Api<ResponseType> {
    fetchRequest: (request: Request) => Promise<Response>;

    static serializeCookies(cookies: { [string]: string }): string {
        return Object.keys(cookies).map((name) => {
            return cookie.serialize(name, cookies[name]);
        }).join(';');
    }

    getCookies(): ?{[string]: string} {
        const cookies = this.getDefaultHeaders().cookie;
        if (!cookies) {
            return null;
        }

        return cookie.parse(cookies);
    }

    addCookies(cookies: {[string]: string}) {
        this.setDefaultHeader('cookie', CookieApi.serializeCookies({
            ...(this.getCookies()),
            ...cookies,
        }));
    }
}

CookieApi.prototype.fetchRequest = async function fetchRequest(request: Request): Promise<Response> {
    const response = await Api.prototype.fetchRequest.call(this, request);
    const setCookieHeader = response.headers.get('set-cookie');
    if (!setCookieHeader) {
        return response;
    }

    const cookies = cookie.parse(setCookieHeader);
    this.addCookies(cookies);
    return response;
};

export default CookieApi;
