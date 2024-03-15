import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseTestModule } from '../database/databaseTestModule';
import { userRepositoryProvider } from './user.repository';
import { createUserJest } from '../helpers/jest/createUserJest';
import { UserPermissionsService } from '../userPermissions/userPermissions.service';
import { userPermissionsRepository } from '../userPermissions/userPermissions.repository';
import { permissionRepository } from '../permissions/permission.repository';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [
        UserController
      ],
      imports: [
        DatabaseTestModule
      ],
      providers: [
        userRepositoryProvider,
        userPermissionsRepository,
        permissionRepository,

        JwtService,
        UserService,
        UserPermissionsService,
      ],
    }).compile();
    

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  describe('root', () => {  
    it('should return Token', async () => {
      await createUserJest();
      const responseLogin: string = await userService
          .getAuthUserByEmailPassword('admin@admin.com', 'admin');

      expect(responseLogin).not.toBe('')
    });
  });
});
