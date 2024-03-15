import { Sequelize } from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { UserPermission } from '../../userPermissions/userPermission.model';
import { Company } from '../../company/company.model';
import { Permission } from '../../permissions/permission.model';
import { CompanyStorage } from '../../companyStorage/companyStorage.model';

export function setModels(sequelize: Sequelize): void {
    sequelize.addModels([
        User,
        UserPermission,
        Permission,
        Company,
        CompanyStorage,
    ]);
}