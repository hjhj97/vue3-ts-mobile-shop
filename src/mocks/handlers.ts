import { rest } from 'msw';
import { products } from './data';

const order = {
	orderId: 1,
};

export const handlers = [
	rest.get('/products', (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				data: {
					products,
				},
			}),
		);
	}),

	rest.get('/products/:product_id', (req, res, ctx) => {
		const { product_id } = req.params;
		return res(
			ctx.json({
				success: true,
				data: {
					product: products.find((product) => product.id === Number(product_id)),
				},
			}),
		);
	}),

	rest.post('/order', (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				data: {
					orderId: 1,
				},
			}),
		);
	}),

	rest.get('/order/:orderId', (req, res, ctx) => {
		const { orderId } = req.params;
		return res(
			ctx.json({
				success: true,
				data: {
					orderId: orderId,
					product: products[0],
				},
			}),
		);
	}),
];
