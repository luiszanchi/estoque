import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseTestModule } from '../database/databaseTestModule';
import { createUserJest } from '../helpers/jest/createUserJest';
import { userPermissionsRepository } from './userPermissions.repository';
import { UserPermissionsService } from './userPermissions.service';
import { adminPermission, userPermission } from './userPermissions.const';
import { userRepositoryProvider } from '../user/user.repository';
import { permissionRepository } from '../permissions/permission.repository';

describe('UserPermissions', () => {
  let userPermissionsService: UserPermissionsService;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [
      ],
      imports: [
        DatabaseTestModule
      ],
      providers: [
        userRepositoryProvider,
        permissionRepository,
        userPermissionsRepository,
        UserPermissionsService,
      ],
    }).compile();

    userPermissionsService = app.get<UserPermissionsService>(UserPermissionsService);
    await userPermissionsService.asyncPermissions();
  });

  describe('root', () => {  

    it('should create a permission', async () => {
      const user = await createUserJest()
      
      await userPermissionsService.create(user, adminPermission.name);
      
      const userPermissions: string[] = await userPermissionsService.getAllPermissions(user);

      expect(userPermissions.length).toBe(1);
      expect(userPermissions[0]).toBe(adminPermission.name);
    });

    it('should create a multiple permissions', async () => {
      const permissions: string[] = [ 
        adminPermission.name,
        userPermission.name
      ];
      const user = await createUserJest()

      await userPermissionsService.createMany(
        user, 
        permissions
      );
      
      const userPermissions: string[] = await userPermissionsService.getAllPermissions(user);

      expect(userPermissions.length).toBe(permissions.length);
      expect(userPermissions[0]).toBe(permissions[0]);
      expect(userPermissions[1]).toBe(permissions[1]);
    });

    it('should create and delete a permission', async () => {
      const user = await createUserJest()
      await userPermissionsService.create(user, adminPermission.name);
      
      const userPermissions: string[] = await userPermissionsService.getAllPermissions(user);

      expect(userPermissions.length).toBe(1);
      expect(userPermissions[0]).toBe(adminPermission.name);

      
      await userPermissionsService.delete(user, adminPermission.name);
      
      const newUserPermissions: string[] = await userPermissionsService.getAllPermissions(user);
      expect(newUserPermissions.length).toBe(0);
    });

    it('should create and delete a multiple permissions', async () => {
      const permissions: string[] = [ 
        adminPermission.name,
        userPermission.name
      ];
      const user = await createUserJest()

      await userPermissionsService.createMany(
        user, 
        permissions
      );
      
      const userPermissions: string[] = await userPermissionsService.getAllPermissions(user);

      expect(userPermissions.length).toBe(permissions.length);
      expect(userPermissions[0]).toBe(permissions[0]);
      expect(userPermissions[1]).toBe(permissions[1]);

      await userPermissionsService.deleteMany(
        user, 
        permissions
      );
      
      const newUserPermissions: string[] = await userPermissionsService.getAllPermissions(user);

      expect(newUserPermissions.length).toBe(0);
    });

    

    it('should create many and delete just one permission', async () => {
      const permissions: string[] = [ 
        adminPermission.name,
        userPermission.name
      ];
      const user = await createUserJest()

      await userPermissionsService.createMany(
        user, 
        permissions
      );
      
      const userPermissions: string[] = await userPermissionsService.getAllPermissions(user);

      expect(userPermissions.length).toBe(permissions.length);
      expect(userPermissions[0]).toBe(permissions[0]);
      expect(userPermissions[1]).toBe(permissions[1]);

      await userPermissionsService.delete(
        user, 
        userPermission.name
      );
      
      const newUserPermissions: string[] = await userPermissionsService.getAllPermissions(user);

      expect(newUserPermissions.length).toBe(1);
      expect(newUserPermissions[0]).toBe(adminPermission.name)
    });

  });
});
