import { Field, InputType } from '@nestjs/graphql';
import { Role } from './role.input';

@InputType()
export class CreateUserDto {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field(() => Role, { defaultValue: Role.GUEST })
  role: Role;
}