import {
	Controller,
	Post,
	Body,
	HttpCode,
	Patch,
	UseGuards,
	Delete,
	Get,
	ConflictException,
	NotFoundException,
	UnauthorizedException,
	Param,
	ParseIntPipe,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserPayload } from '../decorators/user-payload.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserPayload } from './types/user-payload.interface';
import { UserSubscriptionDto } from './dto/subscription-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GetAllUsersDto } from './dto/get-users.dto';
import { USER } from './user.constants';
import { BookService } from '../book/book.service';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly bookService: BookService,
	) {}

	@Post('register')
	async register(@Body() dto: UserDto) {
		try {
			const newUser = await this.userService.createUser(dto.name, dto.password, dto.email);
			return { name: newUser.name, email: newUser.email };
		} catch (e) {
			if (e instanceof Error) throw new ConflictException(e.message);
		}
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: Omit<UserDto, 'name'>) {
		try {
			const user = await this.userService.validateUser(dto.email, dto.password);
			return this.userService.login(user.name, user.email, user.id);
		} catch (e) {
			if (e instanceof Error) {
				if (e.message === USER.NOT_FOUND) throw new NotFoundException(e.message);
				if (e.message === USER.WRONG_PASSWORD) throw new UnauthorizedException(e.message);
			}
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch()
	async updateUser(@Body() updateDto: UpdateUserDto, @UserPayload() payload: IUserPayload) {
		try {
			return await this.userService.updateUser(payload.email, updateDto.name);
		} catch (e) {
			if (e instanceof Error) throw new NotFoundException(e.message);
		}
	}

	/* я бы вынес работу с абонементом в другую сущность (создал бы новый модуль с контроллером и сервисом),
	 но если мы работаем лишь с одним методом и больше никакой логики не ожидается,
	то расположить эту логику в user будет допустимо */
	@UseGuards(JwtAuthGuard)
	@Patch('subscription')
	async setSubscriptionUser(
		@Body() subscriptionDto: UserSubscriptionDto,
		@UserPayload() payload: IUserPayload,
	) {
		try {
			return await this.userService.setSubscriptionUser(
				subscriptionDto.subscription,
				payload.email,
			);
		} catch (e) {
			if (e instanceof Error) throw new NotFoundException(e.message);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete()
	async deleteUser(@UserPayload() payload: IUserPayload) {
		try {
			return await this.userService.deleteUser(payload.email);
		} catch (e) {
			if (e instanceof Error) throw new NotFoundException(e.message);
		}
	}

	@Get('all')
	async findAllUsers(@Body() dto: GetAllUsersDto) {
		return this.userService.findAllUsers(dto.limit, dto.offset);
	}

	@Get(':userId')
	async findOneWithBooks(@Param('userId', ParseIntPipe) userId: number) {
		try {
			const user = await this.userService.findUserById(userId);
			const userBooks = await this.bookService.getBooksByUser(user.id);
			return { user, books: userBooks };
		} catch (e) {
			if (e instanceof Error) throw new NotFoundException(e.message);
		}
	}
}
