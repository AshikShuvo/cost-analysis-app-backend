import { ConflictException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User,Prisma } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService:PrismaService,private readonly authService:AuthService){}
  async create(data: Prisma.UserCreateInput) :Promise<User|void> {
    const salt = bcrypt.genSaltSync(10);
    data['salt']=salt;
    data.password=bcrypt.hashSync(data.password,salt);
    try{
      return await this.prismaService.user.create({data})
    }catch(error){
      throw new ConflictException()
    }
  }

  async loginUser(loginUserDto:LoginUserDto):Promise<string|void>{
      const user=await this.prismaService.user.findFirst(
        {
          where:{
            email:loginUserDto.email
          }
        }
      )
      if(!user){
        throw new UnauthorizedException("wrong Credentials")
      }
      const passwordMatch=await bcrypt.compare(loginUserDto.password,user.password);
      if(!passwordMatch){
        throw new UnauthorizedException("wrong Credentials");
      }
      return this.authService.signUser(user.email,user.phoneNumber)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
