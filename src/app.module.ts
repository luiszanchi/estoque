import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/databaseModule';
import { UserPermissionsModule } from './userPermissions/userPermissions.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    UserPermissionsModule,
    CompanyModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
