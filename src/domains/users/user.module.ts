import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from 'src/providers/http';
import { WeatherService } from './external/weather/weather.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, WeatherService],
  controllers: [UserController],
})
export class UsersModule {}
