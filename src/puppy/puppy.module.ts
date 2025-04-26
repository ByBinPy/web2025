import { Module } from '@nestjs/common';
import { PuppyService } from './puppy.service';
import { PuppyController } from './puppy.controller';

@Module({
  controllers: [PuppyController],
  providers: [PuppyService],
})
export class PuppyModule {}
