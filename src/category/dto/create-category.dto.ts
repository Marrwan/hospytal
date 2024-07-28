import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({ example: 'Health', description: 'The name of the category' })
  name: string;
}
