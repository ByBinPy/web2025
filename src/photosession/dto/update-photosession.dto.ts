import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotosessionDto } from './create-photosession.dto';

export class UpdatePhotosessionDto extends PartialType(CreatePhotosessionDto) {}
