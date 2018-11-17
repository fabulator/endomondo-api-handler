export default class EndomondoException extends Error {
    public constructor(message: string) {
        super(`Endomondo Error: ${message}`);
    }
}
