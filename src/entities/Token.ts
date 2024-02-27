import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
    constructor() {
        this.id = 0;
        this.contract_address = "";
        this.index = '';
        this.current_price = 0;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    index: string;

    @Column()
    contract_address: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    current_price: number | null;
}
