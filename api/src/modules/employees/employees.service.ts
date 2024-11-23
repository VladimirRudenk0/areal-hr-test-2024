import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from '@models/employee.model';
import { Address } from '@models/address.model';
import { Passport } from '@models/passport.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeModel: typeof Employee,
    @InjectModel(Passport) private passportModel: typeof Passport,
    @InjectModel(Address) private addressModel: typeof Address,
    private sequelize: Sequelize,
  ) {}

  async getEmployeeWithDetails(id: string) {
    return this.employeeModel.findOne({
      where: { id },
      include: [Address, Passport],
    });
  }

  async findAll() {
    return this.employeeModel.findAll({
      include: [
        { model: Passport, as: 'passport' },
        { model: Address, as: 'address' },
      ],
    });
  }

  async createEmployee(employeeData: any, passportData: any, addressData: any) {
    const transaction = await this.sequelize.transaction();

    try {
      const passport = await Passport.create(passportData, { transaction });

      const address = await Address.create(addressData, { transaction });

      const employee = await Employee.create(
        {
          ...employeeData,
          passport_id: passport.id,
          address_id: address.id,
        },
        { transaction },
      );

      await transaction.commit();

      console.log('Employee created with ID:', employee.id);
    } catch (error) {
      await transaction.rollback();
      console.error('Error during transaction:', error);
    }
  }

  async findOne(id: number): Promise<Employee | null> {
    return this.employeeModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateDto: UpdateEmployeeDto,
  ): Promise<Employee | null> {
    const employee = await this.employeeModel.findByPk(id);
    if (employee) {
      return employee.update(updateDto);
    }
    return null;
  }

  async remove(id: number): Promise<void> {
    const employee = await this.employeeModel.findByPk(id);
    if (employee) {
      await employee.destroy();
    }
  }
}
