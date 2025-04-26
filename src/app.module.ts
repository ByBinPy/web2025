import { AppController } from './app.controller';
import { PhotosessionService } from './photosession/photosession.service';
import { PhotosessionController } from './photosession/photosession.controller';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { PhotosessionModule } from './photosession/photosession.module';
import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    GraphqlModule,
    CacheModule.register({
      ttl: 10,
      max: 100,
    }),
    UserModule,
    PhotosessionModule,
  ],
  controllers: [
    AppController,
    PhotosessionController,
    UserController,
  ],
  providers: [
    PhotosessionService,
    PrismaService,
    UserResolver,
  ],
})

export class AppModule {
}