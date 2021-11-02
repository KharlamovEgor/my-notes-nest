import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { genSalt, compare, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser({ login, password }: CreateUserDto): Promise<UserDocument> {
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    const newUser = new this.userModel({
      login,
      passwordHash,
    });

    return newUser.save();
  }

  async findUser(login: string): Promise<UserDocument> {
    return this.userModel.findOne({ login }).exec();
  }

  async validateUser(login: string, password: string) {
    const user = await this.findUser(login);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    return {
      login: user.login,
    };
  }
}
