import {
  Controller,
  Post,
  Body,
  Delete,
  NotFoundException,
  UnauthorizedException, Res, Session, ConflictException, UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ElapsedTimeInterceptor } from '../interceptors/elapsed-time.interceptor';

@Controller('users')
@UseInterceptors(ElapsedTimeInterceptor)
export class UserController {

  private readonly userService: UserService = new UserService();

  @Post('/register')
  async register(
    @Body() body: CreateUserDto,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const existingUser = await this.userService.getByEmail(body.email);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const user = await this.userService.create({
      email: body.email,
      name: body.name,
      password: body.password,
    });

    session.isAuthenticated = true;
    session.userId = user.id;
    session.userName = user.name;

    return res.redirect('/index');
  }

  @Post('/login')
  async login(
    @Body() body: LoginUserDto,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const user = await this.userService.getByEmail(body.email);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isPasswordValid = body.password == user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    session.isAuthenticated = true;
    session.userId = user.id;
    session.userName = user.name;

    return res.redirect('/index');
  }
  @Delete()
  remove(@Session() session: Record<string, any>) {
    return this.userService.remove(session.userId);
  }
}
