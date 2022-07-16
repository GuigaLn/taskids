import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import Children from './Children';

/*
* OneToOne
* OneToMany
* ManyToMany
*/

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  answer: boolean;

  @Column()
  answer_text: string;

  @Column()
  realized: boolean;

  @Column()
  child_id: number;

  @ManyToOne(type => Children, tasks => Task, {eager: true})
  @JoinColumn({ name: 'child_id' })
  child: Children;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;