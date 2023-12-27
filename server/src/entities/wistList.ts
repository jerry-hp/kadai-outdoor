import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, DeleteDateColumn } from "typeorm";
import { User } from "./user";
import { Product } from "./product";

@Entity("wistLists")
export class WishList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wishList)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleteAt: Date;
}
