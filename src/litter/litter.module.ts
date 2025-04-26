import { Module } from '@nestjs/common';
import { LitterService } from './litter.service';

@Module({
  controllers: [],
  providers: [LitterService],
})
export class LitterModule {}
