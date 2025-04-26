import { Injectable } from '@nestjs/common';
import { CreateLitterDto } from './dto/create-litter.dto';
import { UpdateLitterDto } from './dto/update-litter.dto';

@Injectable()
export class LitterService {
  create(createLitterDto: CreateLitterDto) {
    return 'This action adds a new litter';
  }

  findAll() {
    return `This action returns all litter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} litter`;
  }

  update(id: number, updateLitterDto: UpdateLitterDto) {
    return `This action updates a #${id} litter`;
  }

  remove(id: number) {
    return `This action removes a #${id} litter`;
  }
}
