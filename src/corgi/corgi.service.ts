import { Injectable } from '@nestjs/common';
import { CreateCorgiDto } from './dto/create-corgi.dto';
import { UpdateCorgiDto } from './dto/update-corgi.dto';

@Injectable()
export class CorgiService {
  create(createCorgiDto: CreateCorgiDto) {
    return 'This action adds a new corgi';
  }

  findAll() {
    return `This action returns all corgi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} corgi`;
  }

  update(id: number, updateCorgiDto: UpdateCorgiDto) {
    return `This action updates a #${id} corgi`;
  }

  remove(id: number) {
    return `This action removes a #${id} corgi`;
  }
}
