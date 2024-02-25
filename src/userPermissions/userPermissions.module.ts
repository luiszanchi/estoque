import { Module } from '@nestjs/common';
import { UserPermissionsService } from './userPermissions.service';
import { userPermissionsRepository } from './userPermissions.repository';

@Module({
    providers: [
        userPermissionsRepository,
        UserPermissionsService
    ]
})

export class UserPermissionsModule {}