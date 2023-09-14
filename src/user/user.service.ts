import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { USER } from './user.constants';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
	) {}

	async createUser(name: string, password: string, email: string) {
		const userExist = await this.userRepository.findUserByEmail(email);
		if (userExist) {
			throw new Error(USER.EXIST);
		}

		const salt = await genSalt(10);
		return this.userRepository.createUser(name, email, await hash(password, salt));
	}

	async validateUser(email: string, password: string) {
		const userExist = await this.findUserByEmail(email);
		const correctPass = await compare(password, userExist.password);
		if (!correctPass) {
			throw new Error(USER.WRONG_PASSWORD);
		}
		return { email: userExist.email, name: userExist.name, id: userExist.id };
	}

	async login(name: string, email: string, id: number) {
		const payload = { name, email, id };

		return {
			accessToken: await this.jwtService.signAsync(payload),
		};
	}

	async findUserByEmail(email: string) {
		const user = await this.userRepository.findUserByEmail(email);
		if (!user) {
			throw new Error(USER.NOT_FOUND);
		}
		return user;
	}

	async findUserById(userId: number) {
		const user = await this.userRepository.findUserById(userId);
		if (!user) {
			throw new Error(USER.EXIST);
		}
		return user;
	}

	async updateUser(email: string, name: string) {
		const user = await this.findUserByEmail(email);
		return this.userRepository.updateUser(name, user.email);
	}

	async setSubscriptionUser(subscription: boolean, email: string) {
		const user = await this.findUserByEmail(email);
		return this.userRepository.subscriptionUser(subscription, user.email);
	}

	async getSubscriptionUser(email: string) {
		const user = await this.findUserByEmail(email);
		return user.subscription;
	}

	async findAllUsers(limit: number, offset: number) {
		return this.userRepository.findAllUsers(limit, offset);
	}

	async deleteUser(email: string) {
		const user = await this.findUserByEmail(email);
		return this.userRepository.deleteUser(user.email);
	}
}
