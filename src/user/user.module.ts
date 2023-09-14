import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '../configs/jwt.config';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	controllers: [UserController],
	providers: [UserService, UserRepository, JwtStrategy],
})
export class UserModule {}
