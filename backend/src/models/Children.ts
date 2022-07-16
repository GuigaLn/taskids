import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import Tasks from './Tasks';

/*
* OneToOne
* OneToMany
* ManyToMany
*/

@Entity('children')
class Child {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  currency: string;

  @Column()
  value: number;

  @Column()
  avatar: string;

  @Column()
  user_id: number;

  @OneToMany(type => Tasks, child => Child)   
  tasks: Tasks[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Child;