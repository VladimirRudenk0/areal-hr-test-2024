import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from '@models/file.model';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File)
    private readonly fileModel: typeof File,
  ) {}

  async findAll(): Promise<File[]> {
    return this.fileModel.findAll({
      where: {
        deleted_at: null,
      },
    });
  }

  async findOne(id: number): Promise<File | null> {
    return this.fileModel.findByPk(id);
  }

  async create(dto: CreateFileDto): Promise<File> {
    console.log('DTO перед созданием:', dto);
    return this.fileModel.create({ ...dto });
  }

  async update(id: number, dto: UpdateFileDto): Promise<File | null> {
    const file = await this.fileModel.findByPk(id);
    if (file) {
      return file.update({ ...dto });
    }
    return null;
  }

  async softDeleteFile(id: number): Promise<void> {
    const file = await File.findByPk(id);

    if (!file) {
      throw new Error('File not found');
    }

    file.deleted_at = new Date();
    await file.save();
  }
}
