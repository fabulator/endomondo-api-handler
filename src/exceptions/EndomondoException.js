// @flow strict
export default class EndomondoException extends Error {
    constructor(message: string) {
        super(`Endomondo Error: ${message}`);
    }
}
