import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/JwtPayload';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generalJwtToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('secret_jwt'),
      expiresIn: this.configService.get<string>('expire_jwt'),
    });
  }
}
