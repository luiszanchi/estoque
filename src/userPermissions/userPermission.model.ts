
import { AutoIncrement, BelongsTo, Column, DataType, Model, PrimaryKey, Table, Validate } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { allPermissions } from './userPermissions.const';

@Table({
    modelName: 'user_permissions'
})
export class UserPermission extends Model<UserPermission> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, allowNull: false })
  id: number;

  @Column({ type: DataType.NUMBER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @Validate({isIn: [allPermissions as ReadonlyArray<any>] })
  @Column({ type: DataType.STRING, allowNull: false })
  permission: string;
}