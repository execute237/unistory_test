import { IsBoolean } from 'class-validator';

export class UserSubscriptionDto {
	@IsBoolean()
	subscription: boolean;
}
