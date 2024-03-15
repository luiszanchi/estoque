import { Provider } from "@nestjs/common";
import { CompanyStorage } from "./companyStorage.model";

export const companyStorageProvideRepository: string = 'COMPANY_STORAGE_REPOSITORY';

export const companyStorageRepository: Provider = {
    provide: companyStorageProvideRepository,
    useValue: CompanyStorage,
}

