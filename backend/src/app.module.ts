import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [
    // Environment Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Cron Jobs
    ScheduleModule.forRoot(),
    
    // Rate Limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),
    
    // Database
    PrismaModule,
    
    // Feature Modules
    AdminModule,
    // AuthModule,
    // MatchesModule,
    // MessagesModule,
    // RoomsModule,
    // AstrologyModule,
    // WebSocketsModule,
  ],
})
export class AppModule {}
