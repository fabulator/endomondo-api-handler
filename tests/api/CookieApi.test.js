import 'cross-fetch/polyfill';
import CookieApi from './../../src/api/CookieApi';

let api = new CookieApi();

describe('CookieApi testing', () => {
    beforeEach(() => {
        api = new CookieApi();
    });

    describe('Working with cookies', () => {
        it('set and get cookies', async () => {
            expect(api.getCookies()).toEqual(null);
            api.addCookies({
                a: 'b',
            });
            expect(api.getCookies()).toEqual({
                a: 'b',
            });
        });

        it('cookies are extended', async () => {
            api.addCookies({
                a: 'b',
                d: 'a',
            });
            api.addCookies({
                a: 'c',
                c: 'd',
            });
            expect(api.getCookies()).toEqual({
                a: 'c',
                c: 'd',
                d: 'a',
            });
        });
    });
});
