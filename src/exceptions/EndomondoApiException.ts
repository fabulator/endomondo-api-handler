import { ApiResponseType } from 'rest-api-handler';
import EndomondoException from './EndomondoException';

/**
 * Endomondo API Exception
 */
export default class EndomondoApiException extends EndomondoException {
    private response: ApiResponseType<any>;

    private request: Request;

    /**
     * Constructor.
     */
    public constructor(response: ApiResponseType<any>, request: Request) {
        super(JSON.stringify(response.data));
        this.response = response;
        this.request = request;
    }

    public getResponse(): ApiResponseType<any> {
        return this.response;
    }

    public getRequest(): Request {
        return this.request;
    }
}
