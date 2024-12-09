import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Position } from '@models/position.model';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position)
    private readonly positionModel: typeof Position,
  ) {}

  async findAll() {
    return this.positionModel.findAll({
      where: {
        deleted_at: null,
      },
    });
  }

  async create(createDto: CreatePositionDto): Promise<Position> {
    const { name } = createDto;
    return this.positionModel.create({ name });
  }

  async findOne(id: number): Promise<Position | null> {
    return this.positionModel.findByPk(id);
  }

  async update(id: number, dto: UpdatePositionDto): Promise<Position | null> {
    const position = await this.positionModel.findByPk(id);
    if (position) {
      return position.update(dto);
    }
    return null;
  }

  async softDeletePosition(id: number): Promise<void> {
    const position = await Position.findByPk(id);

    if (!position) {
      throw new Error('Position not found');
    }

    position.deleted_at = new Date();
    await position.save();
  }
}
