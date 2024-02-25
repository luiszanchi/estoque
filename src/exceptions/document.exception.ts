export class DocumentException extends Error {
    constructor(msg: string) {
        super(msg ? msg : 'A Document Exception occurried!');
    }
}