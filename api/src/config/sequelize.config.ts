import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Organisation } from '@models/organization.model';
import { Department } from '@models/department.model';
import { Position } from '@models/position.model';
import { Employee } from '@models/employee.model';
import { File } from '@models/file.model';
import { HrAction } from '@models/hr_action.model';
import { HistoryOfChanges } from '@models/history_of_change.model';
import { Passport } from '@models/passport.model';
import { Address } from '@models/address.model';
import { User } from '@models/user.model';

// Todo использовать переменные из .env
export const SequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Spiridon_2017',
  database: 'areal_hr',
  models: [
    Organisation,
    Department,
    Position,
    Employee,
    File,
    HrAction,
    HistoryOfChanges,
    Passport,
    Address,
    User,
  ],
  synchronize: false,
  logging: console.log,
};
