import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/databaseModule';
import { UserPermissionsModule } from './userPermissions/userPermissions.module';
import { CompanyModule } from './company/company.module';
import { CompanyStorageModule } from './companyStorage/companyStorage.module';
import { PermissionsModule } from './permissions/permission.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    UserPermissionsModule,
    PermissionsModule,
    CompanyModule,
    CompanyStorageModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
