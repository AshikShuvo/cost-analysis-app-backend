import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports:[JwtModule.register({
    secret:'supper-secret-key'
  })],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
