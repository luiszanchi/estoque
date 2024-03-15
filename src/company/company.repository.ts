import { Provider } from "@nestjs/common";
import { Company } from "./company.model";

export const companyProvideRepository: string = 'COMPANY_REPOSITORY';

export const companyRepository: Provider = {
    provide: companyProvideRepository,
    useValue: Company,
}