'use strict';

class EndomondoException extends Error {
    constructor(message) {
        super(`Endomondo Error: ${message}`);
    }
}

/**
 * Endomondo API Exception
 */

class EndomondoApiException extends EndomondoException {

    /**
     * Constructor.
     */
    constructor(response, request) {
        super(JSON.stringify(response.data));
        this.response = response;
        this.request = request;
    }
}

module.exports = EndomondoApiException;
