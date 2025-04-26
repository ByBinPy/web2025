import { Module } from '@nestjs/common';
import { PuppyService } from './puppy.service';

@Module({
  controllers: [],
  providers: [PuppyService],
})
export class PuppyModule {}
