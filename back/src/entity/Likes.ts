import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Publication } from './Publication';
import { Users } from './User';

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id_like: number;
    @ManyToOne(() => Users, user => user.id_user)
    @JoinColumn()
    id_user: Users
    @ManyToOne(() => Publication, publi => publi.id_publication)
    @JoinColumn()
    id_publication: Publication
}