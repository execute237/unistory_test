import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from '../book/book.entity';
import { Exclude } from 'class-transformer';

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

	@Exclude({ toPlainOnly: true })
	@Column()
	password: string;

	@Column({ default: false })
	subscription: boolean;

	@OneToMany(() => BookEntity, (book) => book.userId)
	books: BookEntity[];
}
