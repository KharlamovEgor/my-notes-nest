import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const oldUser = await this.usersService.findUser(createUserDto.login);

    if (oldUser) {
      throw new BadRequestException();
    }

    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() { login: userLogin, password }: CreateUserDto) {
    const { login } = await this.usersService.validateUser(userLogin, password);
    return await this.authService.login(login);
  }
}
