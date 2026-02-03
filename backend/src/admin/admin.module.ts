import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminConfigService } from './admin-config.service';

@Module({
  controllers: [AdminController],
  providers: [AdminConfigService],
  exports: [AdminConfigService],
})
export class AdminModule {}
