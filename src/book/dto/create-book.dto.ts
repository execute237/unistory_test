import { IsISBN, IsString } from 'class-validator';

export class CreateBookDto {
	@IsString()
	title: string;

	@IsString()
	author: string;

	@IsISBN()
	isbn: string;
}
