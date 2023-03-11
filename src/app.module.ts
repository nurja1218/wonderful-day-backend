import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connectionOptions } from './config';
import { UsersModule } from './domains/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (process.env.NODE_ENV === 'local' && !+process.env.DEBUG_PROD) {
          const options = await connectionOptions(process.env);
          return {
            ...options,
            autoLoadEntities: true,
            name: 'default',
            namingStrategy: new SnakeNamingStrategy(),
          };
        }
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
