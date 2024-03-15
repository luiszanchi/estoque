
import { AutoIncrement, BelongsTo, Column, DataType, Model, PrimaryKey, Table, Validate } from 'sequelize-typescript';
import { Company } from '../company/company.model';


@Table({
    tableName: 'company_storage'
})
export class CompanyStorage extends Model<CompanyStorage> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT.UNSIGNED, allowNull: false })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.BIGINT.UNSIGNED, allowNull: false })
  company_id: number;

  @BelongsTo(() => Company, 'company_id')
  company: Company;
}