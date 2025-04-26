import { Module } from '@nestjs/common';
import { LitterService } from './litter.service';
import { LitterController } from './litter.controller';

@Module({
  controllers: [LitterController],
  providers: [LitterService],
})
export class LitterModule {}
