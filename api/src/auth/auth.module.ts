import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller'; // Путь к контроллеру
import { AuthService } from 'src/auth/auth.service'; // Путь к сервису
import { UserModule } from 'src/modules/user/user.module'; // Путь к модулю пользователей

@Module({
  imports: [UserModule], // Добавляем UserModule сюда
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
