import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserResponseDto } from '../users/dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto';
import { AuthUserResponse } from './response';

@ApiTags('API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.registerUsers(dto);
  }

  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  login(@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
    return this.authService.loginUsers(dto);
  }
}
