import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
	constructor(private dataSource: DataSource) {
		super(UserEntity, dataSource.createEntityManager());
	}

	async createUser(name: string, email: string, password: string) {
		return this.save({ name, email, password });
	}

	async updateUser(name: string, email: string) {
		return this.dataSource
			.createQueryBuilder()
			.update(UserEntity)
			.set({ name })
			.where('email = :email', { email })
			.execute();
	}

	async deleteUser(email: string) {
		return this.delete({ email });
	}

	async subscriptionUser(bool: boolean, email: string) {
		return this.dataSource
			.createQueryBuilder()
			.update(UserEntity)
			.set({ subscription: bool })
			.where('email = :email', { email })
			.execute();
	}

	async findAllUsers(limit: number, offset: number) {
		return this.find({
			take: limit,
			skip: offset,
		});
	}
	//TODO
	async findUser(email: string) {
		return this.findOne({ where: { email } });
	}
}
