// @flow
import type { ApiResponseType } from 'rest-api-handler/src';
import EndomondoException from './EndomondoException';

/**
 * Endomondo API Exception
 */
export default class EndomondoApiException extends EndomondoException {
    response: ApiResponseType<*>;
    request: Request;

    /**
     * Constructor.
     */
    constructor(response: ApiResponseType<*>, request: Request) {
        super(JSON.stringify(response.data));
        this.response = response;
        this.request = request;
    }
}
