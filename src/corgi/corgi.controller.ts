import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorgiService } from './corgi.service';
import { CreateCorgiDto } from './dto/create-corgi.dto';
import { UpdateCorgiDto } from './dto/update-corgi.dto';

@Controller('corgi')
export class CorgiController {
  constructor(private readonly corgiService: CorgiService) {}

  @Post()
  create(@Body() createCorgiDto: CreateCorgiDto) {
    return this.corgiService.create(createCorgiDto);
  }

  @Get()
  findAll() {
    return this.corgiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corgiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorgiDto: UpdateCorgiDto) {
    return this.corgiService.update(+id, updateCorgiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corgiService.remove(+id);
  }
}
