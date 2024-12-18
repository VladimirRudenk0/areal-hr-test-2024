import {
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Position } from './position.model';
import { Passport } from './passport.model';
import { Address } from './address.model';
import { File } from '@models/file.model';

@Table({
  tableName: 'employee',
  freezeTableName: true,
  timestamps: true,
  paranoid: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: 'deleted_at',
})
export class Employee extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  surname: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  second_name: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;

  @Column({ type: DataType.DATE, allowNull: true })
  date_birth: string;

  @ForeignKey(() => Position)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  position_id: number;

  @BelongsTo(() => Position)
  position: Position;

  @ForeignKey(() => Passport)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  passport_id: number;

  @BelongsTo(() => Passport)
  passport: Passport;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  address_id: number;

  @BelongsTo(() => Address)
  address: Address;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date | null;

  static async createWithAssociations(
    employeeData: {
      name: string;
      surname: string;
      second_name: string;
      date_birth: string;
      position_id: number | null;
      passport_id?: number;
      address_id?: number;
    },
    passportData: {
      serial: string;
      number: string;
      date_issue: string;
      code: string;
      issued_by: string;
    },
    addressData: {
      region: string;
      settlement: string;
      street: string;
      house: string;
      housing: string;
      flat: string;
    },
  ) {
    const transaction = await this.sequelize.transaction();

    try {
      const passport = await Passport.create(
        { ...passportData },
        { transaction },
      );

      const address = await Address.create({ ...addressData }, { transaction });

      const employee = await Employee.create(
        {
          ...employeeData,
          passport_id: passport.id,
          address_id: address.id,
        },
        { transaction },
      );

      await transaction.commit();
      return employee;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  @HasMany(() => File)
  files: File[];
}
