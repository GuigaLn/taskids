import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import Children from './Children';

/*
* OneToOne
* OneToMany
* ManyToMany
*/

@Entity('historicPurchase')
class HistoricPurchase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  product_name: string;

  @Column()
  amount: number;

  @Column()
  image: string;

  @Column()
  realized: boolean;

  @Column()
  child_id: number;

  @ManyToOne(type => Children, historicPurchase => HistoricPurchase, {eager: true})
  @JoinColumn({ name: 'child_id' })
  child: Children;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default HistoricPurchase;