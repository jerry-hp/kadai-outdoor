import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  product_id: Product[];

  @ManyToMany(() => User)
  user_id: number;

  @Column()
  quantity: number;

  @Column()
  total_price: number;
}
