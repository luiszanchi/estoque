import { Module } from '@nestjs/common';
import { companyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
    providers: [
        companyRepository,
        CompanyService
    ]
})

export class CompanyModule {}