import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  product_id: Product[];

  @ManyToOne(() => User, (user) => user.cart)
  user: User;

  @Column()
  size: string;

  @Column()
  quantity: number;

  @Column()
  total_price: number;
}
