import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookEntity } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([BookEntity]), forwardRef(() => UserModule)],
	controllers: [BookController],
	providers: [BookService, BookRepository],
	exports: [BookService],
})
export class BookModule {}
