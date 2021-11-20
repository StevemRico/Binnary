import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
    id_user: number;
    @Column({
        length: 10,
        nullable: false
    })
        username: string;
    @Column()
        email: string;
    @Column()
        password: string;
    @Column()
        phone_number: string;
    @Column()
        user_status: string;
    @Column()
        role: string;
    @Column()
        profile_image: string;
    @Column()
        description_profile: string;
}