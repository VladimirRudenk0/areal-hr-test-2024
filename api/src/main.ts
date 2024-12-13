import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const allowedOrigins = ['http://localhost:9000', 'http://localhost']; //todo .env

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.use(
    session({
      secret:
        'c8f23775e445ce1fb719237a4a13ea6bbe3ebefe3eed54c3b6b03130197329f3', //todo .env
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: 'lax',
      },
    }),
  );

  const filePath = path.join('E:/areal-hr-test-2024/files'); //todo redo
  app.useStaticAssets(filePath, { prefix: '/files' });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
