import { Company } from "../company/company.model";

export class CompanyStorageExistentException extends Error {
    constructor(company: Company, name: string) {
        super('The company id: ' + company.id + ' name: "' + company.name + '" just has the storage: "' + name + '"');
    }
}

export class CompanyStorageNotExistentException extends Error {
    constructor(id: number) {
        super('The company storage id: ' + id + ' do not exist');
    }
}