import { Injectable } from '@nestjs/common';
import { CreatePuppyDto } from './dto/create-puppy.dto';
import { UpdatePuppyDto } from './dto/update-puppy.dto';

@Injectable()
export class PuppyService {
  create(createPuppyDto: CreatePuppyDto) {
    return 'This action adds a new puppy';
  }

  findAll() {
    return `This action returns all puppy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} puppy`;
  }

  update(id: number, updatePuppyDto: UpdatePuppyDto) {
    return `This action updates a #${id} puppy`;
  }

  remove(id: number) {
    return `This action removes a #${id} puppy`;
  }
}
