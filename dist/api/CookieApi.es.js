import cookie from 'cookie';
import Api from 'rest-api-handler/dist/Api';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

class CookieApi extends Api {

    static serializeCookies(cookies) {
        return Object.keys(cookies).map(name => {
            return cookie.serialize(name, cookies[name]);
        }).join(';');
    }

    getCookies() {
        const cookies = this.getDefaultHeaders().cookie;
        if (!cookies) {
            return null;
        }

        return cookie.parse(cookies);
    }

    addCookies(cookies) {
        this.setDefaultHeader('cookie', CookieApi.serializeCookies(_extends({}, this.getCookies(), cookies)));
    }
}

CookieApi.prototype.fetchRequest = async function fetchRequest(request) {
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
