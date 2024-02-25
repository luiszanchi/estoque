import { Sequelize } from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { UserPermission } from '../../userPermissions/userPermission.model';

export function setModels(sequelize: Sequelize) {
    sequelize.addModels([
        User,
        UserPermission
    ]);
}