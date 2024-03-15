
import { AutoIncrement, BelongsTo, Column, DataType, Model, PrimaryKey, Table, Validate } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { allPermissions } from './userPermissions.const';
import { Permission } from '../permissions/permission.model';

@Table({
    modelName: 'user_permissions'
})
export class UserPermission extends Model<UserPermission> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, allowNull: false })
  id: number;

  @Column({ type: DataType.BIGINT.UNSIGNED, allowNull: false })
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @Column({ type: DataType.BIGINT.UNSIGNED, allowNull: false })
  permission_id: number;

  @BelongsTo(() => Permission, 'permission_id')
  permission: Permission;
}