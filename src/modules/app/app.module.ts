import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from 'src/configurations';
import { User } from 'src/modules/users/modules/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { WatchlistModule } from '../watchlist/watchlist.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TokenModule,
    WatchlistModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, Watchlist],
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
