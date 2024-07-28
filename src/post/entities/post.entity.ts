import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Comment } from 'src/comments/entities/comment.entity';


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column()
  userId: number;

 @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'userId' })
  author: User;

  @ManyToOne(() => Category, category => category.posts)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  image: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}
