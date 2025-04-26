import { PartialType } from '@nestjs/mapped-types';
import { CreatePuppyDto } from './create-puppy.dto';

export class UpdatePuppyDto extends PartialType(CreatePuppyDto) {}
