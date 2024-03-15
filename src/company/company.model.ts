
import { AutoIncrement, BelongsTo, Column, DataType, Model, PrimaryKey, Table, Validate } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Cnpj } from '../valueObjects/cnpj.valueObject';


@Table({
    tableName: 'company'
})
export class Company extends Model<Company> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT.UNSIGNED, allowNull: false })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ 
    type: DataType.STRING, 
    allowNull: false, 
    validate: { 
        documentValidator(document) {
            new Cnpj(this.document);
        }
    }
  })
  document: string;

  @Column({ type: DataType.BIGINT.UNSIGNED, allowNull: false })
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;
}