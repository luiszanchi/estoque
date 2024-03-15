import { Module } from '@nestjs/common';
import { companyRepository } from './company.repository';
import { CompanyService } from './company.service';
import { userRepositoryProvider } from '../user/user.repository';
import { permissionRepository } from '../permissions/permission.repository';
import { userPermissionsRepository } from '../userPermissions/userPermissions.repository';
import { UserPermissionsService } from '../userPermissions/userPermissions.service';

@Module({
    providers: [
        companyRepository,
        CompanyService,
        userRepositoryProvider,
        permissionRepository,
        userPermissionsRepository,
        UserPermissionsService,
    ]
})

export class CompanyModule {}