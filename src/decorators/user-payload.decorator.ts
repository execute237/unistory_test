import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserPayload } from '../user/types/user-payload.interface';

export const UserPayload = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): IUserPayload => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);
