import { Cnpj } from "../valueObjects/cnpj.valueObject";

export class CompanyWithSameDocumentException extends Error {
    constructor(document: Cnpj) {
        super("Just exist a company with same document " + document.value);
    }
}