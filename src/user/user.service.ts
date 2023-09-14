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
		const userExist = await this.userRepository.findUser(email);
		if (userExist) {
			throw new Error(USER.EXIST);
		}

		const salt = await genSalt(10);
		return this.userRepository.createUser(name, email, await hash(password, salt));
	}

	async validateUser(email: string, password: string) {
		const userExist = await this.userRepository.findUser(email);
		if (!userExist) {
			throw new Error(USER.NOT_FOUND);
		}

		const correctPass = await compare(password, userExist.password);
		if (!correctPass) {
			throw new Error(USER.WRONG_PASSWORD);
		}
		return { email: userExist.email, name: userExist.name };
	}

	async login(name: string, email: string) {
		const payload = { name, email };

		return {
			accessToken: await this.jwtService.signAsync(payload),
		};
	}

	async updateUser(email: string, name: string) {
		const updatedUser = await this.userRepository.updateUser(name, email);
		if (!updatedUser.affected) {
			throw new Error(USER.NOT_FOUND);
		}
		return updatedUser;
	}

	async setSubscriptionUser(subscription: boolean, email: string) {
		const user = await this.userRepository.subscriptionUser(subscription, email);
		if (!user.affected) {
			throw new Error(USER.NOT_FOUND);
		}
		return user;
	}

	async findAllUsers(limit: number, offset: number) {
		return this.userRepository.findAllUsers(limit, offset);
	}

	async deleteUser(email: string) {
		const deletedUser = await this.userRepository.deleteUser(email);
		if (!deletedUser.affected) {
			throw new Error(USER.NOT_FOUND);
		}
		return deletedUser;
	}
}
