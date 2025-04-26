import { AppController } from './app.controller';
import { PhotosessionService } from './photosession/photosession.service';
import { PhotosessionController } from './photosession/photosession.controller';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './user/user.module';
import { PhotosessionModule } from './photosession/photosession.module';
import { Module } from '@nestjs/common';
import { UserResolver } from './graphql/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserService } from './user/user.service';

@Module({
  imports: [
    UserModule,
    PhotosessionModule,
    CacheModule.register({
      ttl: 10,
      max: 100,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      playground: true,
    }),
  ],
  controllers: [AppController, PhotosessionController, UserController],
  providers: [
    PrismaService,
    UserResolver,
    PhotosessionService,
  ],
})
export class AppModule {}