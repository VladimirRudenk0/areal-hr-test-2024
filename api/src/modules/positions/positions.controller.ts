import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  async findAll() {
    return this.positionsService.findAll();
  }

  @Post()
  async create(@Body() createDto: CreatePositionDto) {
    return this.positionsService.create(createDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.positionsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDto: UpdatePositionDto) {
    return this.positionsService.update(id, updateDto);
  }

  @Patch(':id/soft-delete')
  async softDeletePosition(@Param('id') id: number) {
    await this.positionsService.softDeletePosition(id);
    return;
  }
}
