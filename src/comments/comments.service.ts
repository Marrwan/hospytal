import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto & { userId: number }) {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find({ relations: ['author', 'post', 'replies'] });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['author', 'post', 'replies'] });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto & { userId: number }) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.userId !== updateCommentDto.userId) {
      throw new NotFoundException('You are not allowed to update this comment');
    }
    await this.commentRepository.update(id, updateCommentDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.userId !== userId) {
      throw new NotFoundException('You are not allowed to delete this comment');
    }
    return this.commentRepository.remove(comment);
  }
}
