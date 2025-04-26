import { PartialType } from '@nestjs/mapped-types';
import { CreateCorgiDto } from './create-corgi.dto';

export class UpdateCorgiDto extends PartialType(CreateCorgiDto) {}
