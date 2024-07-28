import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'This is a comment' })
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  postId: number;
}
