import { rest } from 'msw';
import { products } from './data';
import { OrderForm } from '@/types/order';

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
		const orderProducts: any[] = await req.json();
		const orderId = new Date().getTime();

		orderProducts.forEach(({ productId, option }) => {
			const foundProduct = products.find((product) => product.id == productId);
			if (!foundProduct) return;

			orders.push({
				...foundProduct,
				orderId,
				options: option,
			});
		});

		return res(
			ctx.json({
				success: true,
				data: {
					orderId,
				},
			}),
		);
	}),

	rest.get('/order/:orderId', (req, res, ctx) => {
		const { orderId } = req.params;
		const orderDatas: any[] = orders.filter((order) => order.orderId == orderId);

		return res(
			ctx.json({
				success: true,
				data: {
					products: orderDatas,
				},
			}),
		);
	}),

	// 주문페이지 - 결제 요청
	rest.post('/pay/:orderId', async (req, res, ctx) => {
		const { orderId } = req.params;
		const { deliveryInfo, paymentInfo } = await req.json<OrderForm>();

		const idx = orders.findIndex((order) => order.orderId == orderId);
		console.log(idx);
		if (idx !== -1) {
			orders[idx].deliveryInfo = deliveryInfo;
			orders[idx].paymentInfo = paymentInfo;
		}

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
