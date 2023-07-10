import { rest } from 'msw';
import { products } from './data';

const orders: any[] = [];

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

	rest.get('/products/:productId', (req, res, ctx) => {
		const { productId } = req.params;
		return res(
			ctx.json({
				success: true,
				data: {
					product: products.find((product) => product.id === Number(productId)),
				},
			}),
		);
	}),

	rest.post('/order', async (req, res, ctx) => {
		const { productId, option } = await req.json();
		const newOrderData = {
			orderId: new Date().getTime(),
			productId,
			option,
		};
		orders.push(newOrderData);

		return res(
			ctx.json({
				success: true,
				data: {
					order: newOrderData,
				},
			}),
		);
	}),

	rest.get('/order/:orderId', (req, res, ctx) => {
		const { orderId } = req.params;
		const orderData = orders.find((order) => order.orderId == orderId);
		const found = products.find((product) => product.id == orderData.productId);

		return res(
			ctx.json({
				success: true,
				data: {
					product: found,
				},
			}),
		);
	}),

	// 주문페이지 - 결제 요청
	rest.post('/pay/:orderId', (req, res, ctx) => {
		const { orderId } = req.params;
		return res(
			ctx.json({
				success: true,
				data: {
					orderId,
				},
			}),
		);
	}),
];
