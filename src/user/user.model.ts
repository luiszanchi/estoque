import { Exclude } from 'class-transformer';
import { AutoIncrement, Column, CreatedAt, DataType, Default, DeletedAt, IsEmail, Max, Model, NotNull, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, allowNull: false })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @IsEmail
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Max(2)
  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Exclude()
  @Column({ type: DataType.STRING })
  password: string;
}