import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(value: AuthDto, metadata: ArgumentMetadata): AuthDto {
    if (metadata.type !== 'body') {
      return value;
    }

    if (value.password.length < 8) {
      throw new BadRequestException('Пароль слишком короткий');
    }
    return value;
  }
}
