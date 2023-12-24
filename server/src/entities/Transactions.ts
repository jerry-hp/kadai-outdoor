import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user";
import { Product } from "./product";
import { Cart } from "./cart";

@Entity({ name: "transactions" })
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ default: "pending" })
  status: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToMany(() => Cart)
  @JoinTable()
  carts: Cart[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
