import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './entities/dto/create-user.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

//   async create(user: Partial<User>): Promise<User> {
//     const newUser = this.usersRepository.create(user);
//     return this.usersRepository.save(newUser);
//   }
  
async create(createUserDto: RegisterDto): Promise<any> {
    try {
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23502') { 
        throw new HttpException('Invalid data: ' + error.detail, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

 
  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
