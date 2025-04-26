import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuppyService } from './puppy.service';
import { CreatePuppyDto } from './dto/create-puppy.dto';
import { UpdatePuppyDto } from './dto/update-puppy.dto';

@Controller('puppy')
export class PuppyController {
  constructor(private readonly puppyService: PuppyService) {}

  @Post()
  create(@Body() createPuppyDto: CreatePuppyDto) {
    return this.puppyService.create(createPuppyDto);
  }

  @Get()
  findAll() {
    return this.puppyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puppyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuppyDto: UpdatePuppyDto) {
    return this.puppyService.update(+id, updatePuppyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puppyService.remove(+id);
  }
}
