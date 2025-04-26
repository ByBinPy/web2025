import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PhotosessionService } from './photosession/photosession.service';
import { PhotosessionController } from './photosession/photosession.controller';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { GrahqlModule } from './grahql/grahql.module';
import { GraphqlResolver } from './graphql/graphql.resolver';

@Module({
  imports: [GrahqlModule],
  controllers: [AppController, PhotosessionController, UserController],
  providers: [PhotosessionService, PrismaService, GraphqlResolver],
})
export class AppModule {}
