import { Module } from '@nestjs/common';
import { CorgiService } from './corgi.service';
import { CorgiController } from './corgi.controller';

@Module({
  controllers: [CorgiController],
  providers: [CorgiService],
})
export class CorgiModule {}
