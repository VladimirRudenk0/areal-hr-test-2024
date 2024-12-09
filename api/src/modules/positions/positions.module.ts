import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Position } from '@models/position.model';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';

@Module({
  imports: [SequelizeModule.forFeature([Position])],
  providers: [PositionsService],
  controllers: [PositionsController],
  exports: [PositionsService],
})
export class PositionsModule {}
