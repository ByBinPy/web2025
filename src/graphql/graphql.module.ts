import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => {
        if (!req.user) {
          throw new Error('Доступ запрещен');
        }
        return { user: req.user };
      },
      playground: process.env.NODE_ENV !== 'production',
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            if (!connectionParams.authToken) {
              throw new Error('Требуется аутентификация');
            }
            return { authToken: connectionParams.authToken };
          },
        },
      },
    }),
    UserModule,
  ],
})
export class GraphqlModule {}