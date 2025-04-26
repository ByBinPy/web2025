import { Module } from '@nestjs/common';
import { PhotosessionService } from './photosession.service';
import { PhotosessionController } from './photosession.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PhotosessionController],
  providers: [PhotosessionService, PrismaService],
})
export class PhotosessionModule {}