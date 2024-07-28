import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {

    @IsUrl()
    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL of the image associated with the post' })
    image: string;
    
    @IsString()
    @ApiProperty({ example: 'This is a post content', description: 'The content of the post' })
    content: string;

    @IsNumber()
    @ApiProperty({ example: 1, description: 'The categoryId' })
    categoryId: number;
}
