import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUrl, IsInt } from 'class-validator';

export class CreatePostDto {
    @IsUrl()
    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL of the image associated with the post' })
    image: string;
    
    @IsString()
    @ApiProperty({ example: 'This is a post content', description: 'The content of the post' })
    content: string;

    @IsNumber()
    @ApiProperty({ example: 1, description: 'The categoryId' })
    categoryId: number;
   
    userId?: number;
}
