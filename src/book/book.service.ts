import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { BOOK } from './book.constants';

@Injectable()
export class BookService {
	constructor(private readonly bookRepository: BookRepository) {}

	async create(isbn: string, title: string, author: string) {
		const existBook = await this.bookRepository.findOneBookByIsbn(isbn);
		if (existBook) {
			throw new Error(BOOK.EXIST);
		}
		return this.bookRepository.createBook(isbn, title, author);
	}

	async findBookById(bookId: number) {
		const book = await this.bookRepository.findOneBookById(bookId);
		if (!book) {
			throw new Error(BOOK.NOT_FOUND);
		}
		return book;
	}

	async bookAddition(userId: number, bookId: number, subscription: boolean) {
		const book = await this.findBookById(bookId);
		if (book.userId) {
			throw new Error(BOOK.TAKEN);
		}
		const userBooks = await this.bookRepository.findBooksByUser(userId);
		if (userBooks.length >= 5) {
			throw new Error(BOOK.LIMIT);
		} else if (!subscription) {
			throw new Error(BOOK.SUBSCRIPTION);
		}

		return this.bookRepository.mapToUser(userId, book.id);
	}

	async bookReturn(bookId: number, userId: number) {
		const existBook = await this.bookRepository.findOneBookById(bookId);
		if (!existBook) {
			throw new Error(BOOK.NOT_FOUND);
		} else if (!existBook.userId) {
			throw new Error(BOOK.CANT_BE_RETURNED);
		}
		return this.bookRepository.detachBook(existBook.id, userId);
	}

	async getBooksByUser(userId: number) {
		return this.bookRepository.findBooksByUser(userId);
	}
}
