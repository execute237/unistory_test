import {
	Controller,
	Post,
	Body,
	Patch,
	Param,
	ConflictException,
	UseGuards,
	ParseIntPipe,
	NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { UserPayload } from '../decorators/user-payload.decorator';
import { IUserPayload } from '../user/types/user-payload.interface';
import { BOOK } from './book.constants';
import { UserService } from '../user/user.service';

@Controller('book')
export class BookController {
	constructor(
		private readonly bookService: BookService,
		private readonly userService: UserService,
	) {}

	@Post()
	async create(@Body() dto: CreateBookDto) {
		try {
			return await this.bookService.create(dto.isbn, dto.title, dto.author);
		} catch (e) {
			if (e instanceof Error) throw new ConflictException(e.message);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async bookAddition(
		@Param('id', ParseIntPipe) bookId: number,
		@UserPayload() payload: IUserPayload,
	) {
		try {
			const subscription = await this.userService.getSubscriptionUser(payload.email);
			return await this.bookService.bookAddition(payload.id, bookId, subscription);
		} catch (e) {
			if (e instanceof Error) {
				if (e.message === BOOK.NOT_FOUND) {
					throw new NotFoundException(e.message);
				} else {
					throw new ConflictException(e.message);
				}
			}
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch('return/:id')
	async bookReturn(
		@Param('id', ParseIntPipe) bookId: number,
		@UserPayload() payload: IUserPayload,
	) {
		try {
			return await this.bookService.bookReturn(bookId, payload.id);
		} catch (e) {
			if (e instanceof Error) {
				if (e.message === BOOK.NOT_FOUND) {
					throw new NotFoundException(e.message);
				} else {
					throw new ConflictException(e.message);
				}
			}
		}
	}
}
