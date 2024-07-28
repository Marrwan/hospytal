import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
export class RegisterDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
   @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.com/picture.jpg', description: 'The profile picture URL of the user', required: false })
  @IsUrl()
  @IsOptional()
  picture?: string;
}

