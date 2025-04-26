import { Module } from '@nestjs/common';
import { CorgiService } from './corgi.service';

@Module({
  controllers: [],
  providers: [CorgiService],
})
export class CorgiModule {}
