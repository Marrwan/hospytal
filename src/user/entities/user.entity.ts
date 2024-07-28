import { Exclude } from 'class-transformer';
import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  picture: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string; 

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
