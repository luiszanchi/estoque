import { Module } from '@nestjs/common';
import { User } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { userRepositoryProvider } from './user.repository';
import { userPermissionsRepository } from '../userPermissions/userPermissions.repository';
import { permissionRepository } from '../permissions/permission.repository';
import { UserPermissionsService } from '../userPermissions/userPermissions.service';
require('dotenv').config()


@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1d" },
        })
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        JwtModule,
        userRepositoryProvider,

        
        userPermissionsRepository,
        permissionRepository,

        JwtService,
        UserPermissionsService,
    ],
    exports: [
        PassportModule,
        JwtModule
    ]
})
export class UserModule {}
