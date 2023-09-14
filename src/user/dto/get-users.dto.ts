import { IsNumber } from 'class-validator';

export class GetAllUsersDto {
	@IsNumber()
	limit: number;

	@IsNumber()
	offset: number;
}
