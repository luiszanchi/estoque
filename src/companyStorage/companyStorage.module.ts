import { Module } from '@nestjs/common';
import { CompanyStorageService } from './companyStorage.service';
import { companyStorageRepository } from './companyStorage.repository';

@Module({
    providers: [
        companyStorageRepository,
        CompanyStorageService
    ]
})

export class CompanyStorageModule {}