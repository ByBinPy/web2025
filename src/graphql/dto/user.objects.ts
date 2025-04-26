import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from './role.input';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => Role)
  role: Role;

  password: string;
}