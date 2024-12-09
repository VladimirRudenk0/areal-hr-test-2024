import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HrAction } from '@models/hr_action.model';
import { CreateHrActionDto } from './dto/create-hr_action.dto';
import { UpdateHrActionDto } from './dto/update-hr_action.dto';

@Injectable()
export class HrActionsService {
  constructor(
    @InjectModel(HrAction)
    private readonly hrActionModel: typeof HrAction,
  ) {}

  // Метод для получения всех записей
  async findAll(): Promise<HrAction[]> {
    return this.hrActionModel.findAll({
      where: {
        deleted_at: null,
      },
    });
  }

  // Метод для создания записи
  async create(createDto: CreateHrActionDto): Promise<HrAction> {
    // Здесь создаем запись с использованием DTO
    return this.hrActionModel.create({
      action_type: createDto.action_type,
      date: createDto.date,
      salary: createDto.salary,
      employee_id: createDto.employee_id,
      department_id: createDto.department_id,
      position_id: createDto.position_id,
    });
  }

  async findOne(id: number): Promise<HrAction | null> {
    return this.hrActionModel.findByPk(id);
  }

  // Метод для обновления записи
  async update(id: number, dto: UpdateHrActionDto): Promise<HrAction | null> {
    const action = await this.hrActionModel.findByPk(id);
    if (action) {
      return action.update(dto);
    }
    return null;
  }

  // Метод для удаления записи
  async softDeleteHrAction(id: number): Promise<void> {
    const action = await HrAction.findByPk(id);

    if (!action) {
      throw new Error('Hr action not found');
    }

    action.deleted_at = new Date();
    await action.save();
  }
}
