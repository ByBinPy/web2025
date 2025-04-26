import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { ConflictException, NotFoundException, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { ElapsedTimeInterceptor } from '../interceptors/elapsed-time.interceptor';
import { User } from './dto/user.objects';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.input';
import { LoginUserDto } from './dto/login-user.input';

@Resolver(() => User)
@UseInterceptors(ElapsedTimeInterceptor)
export class UserResolver {
  private readonly userService: UserService = new UserService();

  @Mutation(() => User)
  async register(@Args('input', { type: () => CreateUserDto }) input: CreateUserDto) {    const existingUser = await this.userService.getByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    return this.userService.create({
      name: input.name,
      email: input.email,
      password: input.password,
    });
  }


  @Mutation(() => User)
  async login(
    @Args('input') input: LoginUserDto,
    @Context() context: { req: { session: Record<string, any> } },
  ) {
    const user = await this.userService.getByEmail(input.email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (input.password !== user.password) {
      throw new UnauthorizedException('Неверный пароль');
    }

    context.req.session.isAuthenticated = true;
    context.req.session.userId = user.id;
    context.req.session.userName = user.name;

    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Context() context: { req: { session: Record<string, any> } }) {
    const userId = context.req.session.userId;
    if (!userId) {
      throw new UnauthorizedException('Необходима авторизация');
    }

    this.userService.remove(userId);
    context.req.session.destroy();
    return true;
  }
}