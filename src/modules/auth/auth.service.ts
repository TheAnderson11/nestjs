import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';
import { TokenService } from '../token/token.service';
import { CreateUserDto, UserResponseDto } from '../users/dto';
import { UserService } from '../users/users.service';
import { UserLoginDto } from './dto';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);
      return this.userService.createUser(dto);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async loginUsers(dto: UserLoginDto): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);

      if (!existUser) throw new BadRequestException(AppError.USER_NOT_FOUND);
      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);

      const user = await this.userService.publicUser(dto.email);

      if (!user) {
        throw new BadRequestException(AppError.USER_NOT_FOUND);
      }
      const payload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };
      const token = await this.tokenService.generalJwtToken(payload);
      return { user, token };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
