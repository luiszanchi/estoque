import { Cnpj } from "../valueObjects/cnpj.valueObject";

export interface InputCreateCompanyInterface {
    name: string,
    document: Cnpj
}