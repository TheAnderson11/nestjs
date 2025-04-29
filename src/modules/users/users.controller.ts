import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateUserDto } from './dto';
import { UserService } from './users.service';

@ApiTags('API')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Patch('/update-user')
  updateUser(
    @Body() updateDto: UpdateUserDto,
    @Req() request,
  ): Promise<UpdateUserDto> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto);
  }

  @Post('/delete-by-email')
  deleteByEmail(@Body('email') email: string): Promise<boolean> {
    return this.userService.deleteUser(email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }
}
