import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './User';

@Entity()
export class Follows {
    @PrimaryGeneratedColumn()
    id_follow: number;
    @ManyToOne(() => Users, user => user.id_user)
    @JoinColumn()
    id_user_follow: Users
    @ManyToOne(() => Users, user => user.id_user)
    @JoinColumn()
    id_user_follower: Users
}