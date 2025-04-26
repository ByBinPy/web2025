import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Puppy } from '../../puppy/entities/puppy.entity';
import { Photosession } from '../../photosession/entities/photosession.entity';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => Role)
  role: Role;

  @Field(() => [Puppy], { nullable: true })
  reservedPuppies?: Puppy[];

  @Field(() => [Photosession], { nullable: true })
  photosessions?: Photosession[];
}

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}