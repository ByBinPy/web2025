import { Injectable } from '@nestjs/common';
import { UpdatePhotosessionDto } from './dto/update-photosession.dto';
import { Photosession, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
@Injectable()
export class PhotosessionService {

  async create(data: Prisma.PhotosessionCreateInput): Promise<Photosession> {
    return prisma.photosession.create({
      data
    });
  }

  async findAllById(userId: string): Promise<Photosession[]> {
    return prisma.photosession.findMany({
      where: {
        userId: userId,
      },
      orderBy: { date: 'asc' },
    });
  }

  updateDate(id: string, updatePhotosessionDto: UpdatePhotosessionDto) {
    return prisma.photosession.update({
      where: {
        id: id
      },
      data: {
        date: updatePhotosessionDto.date
      }
    })
  }

  remove(id: string) {
   return prisma.photosession.delete({
     where: {
       id: id
     }
   })
  }
}
