import {Entity,Column,PrimaryGeneratedColumn,JoinColumn,ManyToOne} from 'typeorm';
import { Users } from './User';

@Entity()
export class Publication{
    @PrimaryGeneratedColumn()
        id_publication: number;
    @Column()
        description: string;
    @Column()
        file: string;
    @Column()
        publication_State: number;
    @Column({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP"
    })
        created_at: Date;
    @Column({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP"
    })
        updated_at: Date;
    @ManyToOne(() => Users, user => user.id_user)
    @JoinColumn()
        id_user : Users
}