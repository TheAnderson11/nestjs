import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';
import { JwtPayload } from 'src/common/interfaces/JwtPayload';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../users/dto';
import { UserService } from '../users/users.service';
import { UserLoginDto } from './dto';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.userService.createUser(dto);
  }

  async loginUsers(dto: UserLoginDto): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (!existUser) throw new BadRequestException(AppError.USER_NOT_FOUND);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const userData: JwtPayload = {
      firstName: existUser.firstName,
      email: existUser.email,
    };
    const token = await this.tokenService.generalJwtToken(userData);
    const user = await this.userService.publicUser(dto.email);
    if (!user?.firstName)
      throw new BadRequestException(AppError.USER_NOT_FOUND);
    return { ...user, token };
  }
}
