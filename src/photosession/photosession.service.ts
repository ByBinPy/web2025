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

  findOne(id: number) {
    return `This action returns a #${id} photosession`;
  }

  update(id: number, updatePhotosessionDto: UpdatePhotosessionDto) {
    return `This action updates a #${id} photosession`;
  }

  remove(id: number) {
    return `This action removes a #${id} photosession`;
  }
}
