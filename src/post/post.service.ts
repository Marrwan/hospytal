import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto & { userId: number }) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({ relations: ['user', 'category'] });
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['user', 'category'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto & { userId: number }) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.userId !== updatePostDto.userId) {
      throw new NotFoundException('You are not allowed to update this post');
    }
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.userId !== userId) {
      throw new NotFoundException('You are not allowed to delete this post');
    }
    return this.postRepository.remove(post);
  }
}
