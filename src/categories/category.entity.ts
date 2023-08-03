import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'categories'})
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    image: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    create_at: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    update_at: Date;


}