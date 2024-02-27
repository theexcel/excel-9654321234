import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  contract_address: string = "";

  @Column()
  token_index: string = "";

  @Column()
  listing_price: number = 0;

  @Column()
  maker: string = "";

  @Column({ type: "datetime", nullable: true }) 
  listing_from: Date | null = null;

  @Column({ type: "datetime", nullable: true }) 
  listing_to: Date | null = null;

  @Column({ type: "datetime" }) 
  event_timestamp: Date = new Date();
}
