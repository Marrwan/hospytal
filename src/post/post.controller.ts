import { Controller, Get, Post, Body, Param, Delete, Patch, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';


@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: PostEntity })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.create({ ...createPostDto, userId: req.user.userId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Return all posts.', type: [PostEntity] })
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({ status: 200, description: 'Return the post.', type: PostEntity })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiResponse({ status: 200, description: 'The post has been successfully updated.', type: PostEntity })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(@Param('id') id: number, @Request() req, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, { ...updatePostDto, userId: req.user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: number, @Request() req) {
    return this.postService.remove(id, req.user.userId);
  }
}
