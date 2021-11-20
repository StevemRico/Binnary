import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Publication } from './Publication';
import { Users } from './User';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id_comment: number;
    @Column()
    text: string;
    @ManyToOne(() => Users, user => user.id_user)
    @JoinColumn()
    id_user: Users
    @ManyToOne(() => Publication, publi => publi.id_publication)
    @JoinColumn()
    id_publication: Publication
}