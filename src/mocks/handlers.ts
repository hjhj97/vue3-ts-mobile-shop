import { rest } from 'msw';

export const handlers = [
	rest.get('/', (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				data: {
					message: 'hello',
				},
			}),
		);
	}),
];
