import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { AuthPayload, User } from './dto/user.objects';
import { LoginUserInput } from './dto/login-user.inputs';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async registerUser(@Args('input') input: CreateUserInput) {
    const existingUser = await this.userService.getByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }
    return this.userService.create(input);
  }

  @Mutation(() => AuthPayload)
  async loginUser(@Args('input') input: LoginUserInput) {
    const user = await this.userService.getByEmail(input.email);
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    const isValid = input.password === user.password;
    if (!isValid) throw new UnauthorizedException('Неверный пароль');

    return { user }
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return this.userService.remove(+id);
  }
}