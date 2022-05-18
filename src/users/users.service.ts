import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User,Prisma } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService:PrismaService){}
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
