import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Employee } from './employee.model';

@Table({ tableName: 'address', freezeTableName: true, timestamps: false })
export class Address extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  region: string;

  @Column({ type: DataType.STRING, allowNull: false })
  settlement: string;

  @Column({ type: DataType.STRING, allowNull: false })
  street: string;

  @Column({ type: DataType.STRING, allowNull: false })
  house: string;

  @Column({ type: DataType.STRING, allowNull: false })
  housing: string;

  @Column({ type: DataType.STRING, allowNull: false })
  flat: string;

  @BelongsTo(() => Employee, { foreignKey: 'id' })
  employee: Employee;
}