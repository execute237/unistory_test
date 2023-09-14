import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/user.entity';

@Entity({
	name: 'book',
})
export class BookEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	isbn: string;

	@Column()
	title: string;

	@Column()
	author: string;

	@Column({ name: 'user_id', nullable: true })
	userId: number;

	@ManyToOne(() => UserEntity, (user) => user.books)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;
}
