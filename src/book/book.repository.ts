import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BookEntity } from './book.entity';

@Injectable()
export class BookRepository extends Repository<BookEntity> {
	constructor(private dataSource: DataSource) {
		super(BookEntity, dataSource.createEntityManager());
	}

	async createBook(isbn: string, title: string, author: string) {
		return this.save({ isbn, title, author });
	}

	async findOneBookByIsbn(isbn: string) {
		return this.findOne({ where: { isbn } });
	}

	async findOneBookById(id: number) {
		return this.findOne({ where: { id } });
	}

	async findBooksByUser(userId: number) {
		return this.find({ where: { userId } });
	}

	async mapToUser(userId: number, bookId: number) {
		return this.dataSource
			.createQueryBuilder()
			.update(BookEntity)
			.set({ userId })
			.where('id = :id', { id: bookId })
			.execute();
	}

	async detachBook(bookId: number, userId: number) {
		return this.dataSource
			.createQueryBuilder()
			.update(BookEntity)
			.set({ userId: null })
			.where('id = :id', { id: bookId })
			.andWhere('user_id = :userId', { userId })
			.execute();
	}
}
