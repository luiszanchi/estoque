
import { AutoIncrement, BelongsTo, Column, DataType, Model, PrimaryKey, Table, Validate } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Cnpj } from 'src/valueObjects/cnpj.valueObject';


@Table({
    modelName: 'user_permissions'
})
export class Company extends Model<Company> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, allowNull: false })
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

  @Column({ type: DataType.NUMBER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;
}