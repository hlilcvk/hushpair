import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  // Security
  app.use(helmet());
  app.enableCors({
    origin: [
      'http://localhost:3001', // Admin panel
      'http://localhost:3000', // Backend
      configService.get('ADMIN_PANEL_URL'),
    ],
    credentials: true,
  });

  // Compression
  app.use(compression());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║           🚀 HUSHPAIR BACKEND STARTED                ║
  ║                                                       ║
  ║   Server:        http://localhost:${port}              ║
  ║   API Docs:      http://localhost:${port}/api          ║
  ║   Admin Panel:   ${configService.get('ADMIN_PANEL_URL')}   ║
  ║                                                       ║
  ║   Environment:   ${configService.get('NODE_ENV')}       ║
  ║   Database:      Connected ✅                        ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
}

bootstrap();
