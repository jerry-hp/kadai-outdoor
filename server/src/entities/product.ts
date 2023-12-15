import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_brand: string;

  @Column({ default: "https://img.freepik.com/free-vector/gradient-logo-template-summer-camp_23-2150382138.jpg?size=626&ext=jpg&ga=GA1.1.1329682845.1702356189&semt=sph" })
  product_image: string;

  @Column()
  product_category: string;

  @Column()
  product_price: number;

  @Column()
  product_description: string;
}
