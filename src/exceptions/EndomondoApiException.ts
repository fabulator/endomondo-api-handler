import { ApiResponseType } from 'rest-api-handler';
import EndomondoException from './EndomondoException';

/**
 * Endomondo API Exception
 */
export default class EndomondoApiException extends EndomondoException {
    protected response: ApiResponseType<any>;

    /**
     * Constructor.
     */
    public constructor(response: ApiResponseType<any>) {
        super(JSON.stringify(response.data));
        this.response = response;
    }

    public getResponse(): ApiResponseType<any> {
        return this.response;
    }

    public getRequest(): Request {
        return this.response.request;
    }
}
