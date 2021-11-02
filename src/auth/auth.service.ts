import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(login: string) {
    const payload = { login };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
