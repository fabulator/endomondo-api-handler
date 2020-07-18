import { ApiResponseType } from 'rest-api-handler';
import EndomondoException from './EndomondoException';

/**
 * Endomondo API Exception
 */
export default class EndomondoApiException extends EndomondoException {
    protected response: ApiResponseType<unknown>;

    /**
     * Constructor.
     */
    public constructor(response: ApiResponseType<unknown>) {
        super(JSON.stringify(response.data));
        this.response = response;
    }

    public getResponse(): ApiResponseType<unknown> {
        return this.response;
    }

    public getRequest(): Request {
        return this.response.request;
    }
}
