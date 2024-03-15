import { Module } from '@nestjs/common';
import { UserPermissionsService } from './userPermissions.service';
import { userPermissionsRepository } from './userPermissions.repository';
import { userRepositoryProvider } from '../user/user.repository';
import { permissionRepository } from '../permissions/permission.repository';

@Module({
    providers: [
        userPermissionsRepository,
        UserPermissionsService,
        userRepositoryProvider,
        permissionRepository,
    ]
})

export class UserPermissionsModule {}