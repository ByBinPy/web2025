import { Module } from '@nestjs/common';
import { PhotosessionService } from './photosession.service';
import { PhotosessionController } from './photosession.controller';
import { PrismaService } from '../prisma.service';
import { AppModule } from '../app.module';

@Module({
  imports: [AppModule],
  controllers: [PhotosessionController],
  providers: [PhotosessionService, PrismaService],
})
export class PhotosessionModule {}