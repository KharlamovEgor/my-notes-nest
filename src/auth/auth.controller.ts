import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { PasswordValidationPipe } from '../pipes/password-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UsePipes(ValidationPipe, PasswordValidationPipe)
  @Post('register')
  @UsePipes(new PasswordValidationPipe())
  async register(@Body() authDto: AuthDto) {
    const oldUser = await this.usersService.findUser(authDto.login);

    if (oldUser) {
      throw new BadRequestException();
    }

    return this.usersService.createUser(authDto);
  }

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() { login: userLogin, password }: AuthDto) {
    const { login } = await this.usersService.validateUser(userLogin, password);
    return await this.authService.login(login);
  }
}
