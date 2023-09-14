import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from '../book/entities/book.entity';

@Entity({
	name: 'user',
})
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ default: false })
	subscription: boolean;

	@OneToMany(() => BookEntity, (book) => book.userId)
	books: BookEntity[];
}
