import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cart } from "./cart";
import { Transactions } from "./Transactions";
import { WishList } from "./wistList";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: "https://th.bing.com/th/id/OIP.Nen6j3vBZdl8g8kzNfoEHQAAAA?rs=1&pid=ImgDetMain" })
  image: string;

  @Column({ default: "Costumer" })
  role: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => Transactions, (transaction) => transaction.user)
  transactions: Transactions[];

  @OneToMany(() => WishList, (wishList) => wishList.user)
  wishList: WishList[];
}
