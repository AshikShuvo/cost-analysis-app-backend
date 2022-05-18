import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService){}
    signUser(email:string,phoneNumber:string):string{
        return this.jwtService.sign(
           {
               email,
               phoneNumber
           }

        )
    }
}
