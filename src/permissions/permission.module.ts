import { Module } from '@nestjs/common';
import { permissionRepository } from './permission.repository';

@Module({
    providers: [
        permissionRepository
    ]
})

export class PermissionsModule {}