import { UpdatePhotosessionDto } from './dto/update-photosession.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session, Sse, UseInterceptors,
} from '@nestjs/common';
import { CreatePhotosessionDto } from './dto/create-photosession.dto';
import { PhotosessionService } from './photosession.service';
import { Photosession as PhotosessionModel } from '@prisma/client';
import { interval, map, switchMap, tap } from 'rxjs';
import { EtagInterceptor } from '../interceptors/etag.interceptor';

@Controller('photosession')
export class PhotosessionController {
  private readonly photosessionService: PhotosessionService = new PhotosessionService()

  @Sse('loadPhotosessions')
  sse(@Session() session: Record<string, any>) {
    return interval(5000).pipe(
      switchMap(() => this.photosessionService.findAllById(session.userId)),
      map(bookings => ({
        data: bookings.map(b => {
          const date = new Date(b.date);
          const timeString = date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Moscow'
          });

          return {
            date: date.toISOString().split('T')[0],
            time: timeString,
            name: b.guestName,
            phone: b.guestPhone,
            email: b.guestEmail
          };
        })
      })),
      tap(data => console.log('SSE Sent:', data))
    );
  }

  @Post()
  async create(
    @Body() createPhotosessionDto: CreatePhotosessionDto,
    @Session() session: Record<string, any>,
  ): Promise<PhotosessionModel> {
    return this.photosessionService.create({
      date: new Date(createPhotosessionDto.date),
      guestEmail: createPhotosessionDto.email,
      guestName: createPhotosessionDto.name,
      guestPhone: createPhotosessionDto.phone,
      user: session.userId
        ? { connect: { id: session.userId } }
        : undefined
    });
  }
  @Get()
  @UseInterceptors(EtagInterceptor)
  findAllById(@Session() session: Record<string, any>) {
    return this.photosessionService.findAllById(session.userId);
  }

  @Patch(':email')
  updateDate(
    @Param('email') id: string,
    @Body() updatePhotosessionDto: UpdatePhotosessionDto,
  ) {
    return this.photosessionService.updateDate(id, updatePhotosessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosessionService.remove(id);
  }
}
