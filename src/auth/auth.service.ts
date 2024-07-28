import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, ...userDetails } = registerDto;
    console.log('registerDto:', registerDto);
    console.log('password:', password);
    console.log('userDetails:', userDetails);
  
    const salt = await bcrypt.genSalt(); 
    console.log('salt:', salt);
  
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('hashedPassword:', hashedPassword);
  
    try {
      return await this.usersService.create({ ...userDetails, password: hashedPassword });
    } catch (error) {
      console.error('Error in creating user:', error);
      throw new HttpException('User registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(loginDto: LoginDto) {
  //   const { username, password } = loginDto;
  //   console.log({username, password});
  //   if (!username) {
  //     throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
  //   }
  //   if (!password) {
  //     throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
  //   }

  //   const user = await this.validateUser(username, password);
  //   if (!user) {
  //     return null;
  //   }
  //   console.log({user});
    
  //   const payload = { username: user.username, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
