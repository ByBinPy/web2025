import { PartialType } from '@nestjs/mapped-types';
import { CreateLitterDto } from './create-litter.dto';

export class UpdateLitterDto extends PartialType(CreateLitterDto) {}
