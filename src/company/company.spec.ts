import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseTestModule } from '../database/databaseTestModule';
import { User } from '../user/user.model';
import { createUserJest } from '../helpers/jest/createUserJest';
import { UserPermissionsService } from '../userPermissions/userPermissions.service';
import { userPermissionsRepository } from '../userPermissions/userPermissions.repository';
import { adminPermission } from '../userPermissions/userPermissions.const';
import { CompanyService } from './company.service';
import { UserDontHavePermissionException } from '../userPermissions/userPermission.exception';
import { Company } from './company.model';
import { CompanyWithSameDocumentException } from './company.exception';
import { userRepositoryProvider } from '../user/user.repository';
import { Cnpj } from '../valueObjects/cnpj.valueObject';
import { CnpjFaker } from '../faker/cnpj.faker';
import { permissionRepository } from '../permissions/permission.repository';
import { companyRepository } from './company.repository';

describe('UserController', () => {
  let userPermissionsService: UserPermissionsService;
  let companyService: CompanyService;
  let app: TestingModule;
  
  let user: User;

  const generateCnpj = () => {
    return new Cnpj(CnpjFaker.generate());
  }

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
        companyRepository,
        CompanyService
      ],
    }).compile();

    userPermissionsService = app.get<UserPermissionsService>(UserPermissionsService);
    companyService = app.get<CompanyService>(CompanyService);
    await userPermissionsService.asyncPermissions();
    user = await createUserJest()
  });

  describe('root', () => {  

    it('should create a company', async () => {
      
      const user = await createUserJest()

      await userPermissionsService.create(user, adminPermission.name, false);

      const company = await companyService.createCompany(
        user, 
        {
          name: 'Teste',
          document: generateCnpj()
        }
      )

      expect(company).toBeInstanceOf(Company);
    });

    // it('should not have permission to create a company', async () => {
    //   let exception = null;
    //   try {
    //     await companyService.createCompany(
    //       user, 
    //       {
    //         name: 'Teste',
    //         document: generateCnpj()
    //       }
    //     ) 
    //   } catch (e) {
    //     exception = e;
    //   }

    //   expect(exception).toBeInstanceOf(UserDontHavePermissionException)
    // });

    
    // it('should not create duplicate company', async () => {
    //   let exception = null;
    //   try {
    //     await userPermissionsService.create(user, adminPermission.name, false);
    //     const input = {
    //       name: 'Teste',
    //       document: generateCnpj()
    //     };
        
    //     await companyService.createCompany(
    //       user, 
    //       input
    //     );

    //     await companyService.createCompany(
    //       user, 
    //       input
    //     );
    //   } catch (e) {
    //     exception = e;
    //   }

    //   expect(exception).toBeInstanceOf(CompanyWithSameDocumentException);
    // });

  });
});
