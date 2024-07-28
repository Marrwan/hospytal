import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1, required: false })
  parentId?: number;
}
