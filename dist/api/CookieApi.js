'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var cookie = _interopDefault(require('cookie'));
var Api = _interopDefault(require('rest-api-handler/dist/Api'));

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
        const cookies = this.getDefaultHeaders()['cookie'];
        if (!cookies) {
            return null;
        }

        return cookie.parse(cookies);
    }

    setCookies(cookies) {
        this.setDefaultHeader('cookie', CookieApi.serializeCookies(_extends({}, this.getCookies(), cookies)));
    }
}

CookieApi.prototype.fetchRequest = async function (request) {
    const response = await Api.prototype.fetchRequest.call(this, request);
    const setCookieHeader = response.headers.get('set-cookie');
    if (!setCookieHeader) {
        return response;
    }

    const cookies = cookie.parse(setCookieHeader);
    this.setCookies(cookies);
    return response;
};

module.exports = CookieApi;
