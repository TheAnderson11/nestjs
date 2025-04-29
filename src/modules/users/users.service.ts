import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import { User } from './modules/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const hashedPassword = await this.hashPassword(dto.password);

      const newUser = await this.userRepository.create({
        ...dto,
        password: hashedPassword,
      });
      const { firstName, userName, email } = newUser;
      return { firstName, userName, email };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<User | null> {
    try {
      return this.userRepository.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.userRepository.update(dto, { where: { email } });
      return dto;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email } });
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
