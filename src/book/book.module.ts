import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookEntity } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([BookEntity])],
	controllers: [BookController],
	providers: [BookService, BookRepository],
})
export class BookModule {}
