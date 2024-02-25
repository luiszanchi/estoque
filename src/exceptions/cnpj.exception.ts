import { DocumentException } from "./document.exception";

export class CnpjInvalidException extends DocumentException {
    constructor(cnpj: string) {
        super("The document " + cnpj + " cnpj is invalid!");
    }
}