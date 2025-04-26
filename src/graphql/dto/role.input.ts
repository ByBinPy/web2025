import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User roles',
});