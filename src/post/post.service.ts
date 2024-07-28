import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Category } from 'src/category/entities/category.entity';



@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createPostDto: CreatePostDto  & { userId: number }) {
    const category = await this.categoryRepository.findOneBy({id: createPostDto.categoryId});
    if (!category) {
      throw new NotFoundException('Invalid category ID');
    }
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({relations: ['author', 'comments', 'category']});
  }

  async findOne(id: number) {
     let post = await this.postRepository.findOne({where: {id}, relations: ['author', 'comments', 'category']});
     if(!post){
        throw new NotFoundException(`Post with the id ${id} does not exist`);
     }
     return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    let post = await this.postRepository.findOne({where: {id}, relations: ['author', 'comments', 'category']});
    if(!post){
        throw new NotFoundException(`Post with the id ${id} does not exist`);
     }
     await this.postRepository.update(id, updatePostDto);
    return post;
  }

  async remove(id: number) {
    let post = await this.postRepository.findOne({where: {id}, relations: ['author', 'comments', 'category']});
    if(!post){
        throw new NotFoundException(`Post with the id ${id} does not exist`);
     }
     await this.postRepository.delete(id);
    return {status: "Success", message: "Post deleted Successfully"}

  }
}
