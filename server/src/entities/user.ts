import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cart } from "./cart";

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

  @OneToMany((type) => Cart, (cart) => cart.user)
  cart: Cart[];
}
