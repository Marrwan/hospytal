import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
  @ApiBody({ type: RegisterDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      message: 'User registered successfully',
      user,
    };
  }

  @ApiOperation({ summary: 'User login' })
//   @ApiResponse({ status: 200, description: 'The user has been successfully logged in.' })
//   @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
//   async login(@Body() loginDto: LoginDto) {
//     const token = await this.authService.login(loginDto);
//     if (!token) {
//       return {
//         statusCode: HttpStatus.UNAUTHORIZED,
//         message: 'Invalid credentials',
//       };
//     }
//     return token;
//   } 
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

