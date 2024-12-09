import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from '@models/file.model';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  async findAll(): Promise<File[]> {
    return this.filesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<File> {
    const file = await this.filesService.findOne(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  @Post()
  async create(@Body() createFileDto: CreateFileDto): Promise<File> {
    return this.filesService.create(createFileDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFileDto: UpdateFileDto,
  ): Promise<File> {
    const updatedFile = await this.filesService.update(id, updateFileDto);
    if (!updatedFile) {
      throw new NotFoundException('File not found');
    }
    return updatedFile;
  }

  @Patch(':id/soft-delete')
  async softDeleteFile(@Param('id') id: number) {
    await this.filesService.softDeleteFile(id);
    return;
  }
}
