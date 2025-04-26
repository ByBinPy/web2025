import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LitterService } from './litter.service';
import { CreateLitterDto } from './dto/create-litter.dto';
import { UpdateLitterDto } from './dto/update-litter.dto';

@Controller('litter')
export class LitterController {
  constructor(private readonly litterService: LitterService) {}

  @Post()
  create(@Body() createLitterDto: CreateLitterDto) {
    return this.litterService.create(createLitterDto);
  }

  @Get()
  findAll() {
    return this.litterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.litterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLitterDto: UpdateLitterDto) {
    return this.litterService.update(+id, updateLitterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.litterService.remove(+id);
  }
}
