import { rest } from 'msw';
import { products } from './data';
import { OrderForm } from '@/types/order';

const orders: any[] = [];
const carts: any[] = [];

export const handlers = [
	// getProducts - 상품 목록
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

	// getProductById - 상품 상세 정보
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

	// requestOrder - 바로 주문
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

	rest.get('/cart', (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				data: {
					carts,
				},
			}),
		);
	}),

	rest.post('/cart', async (req, res, ctx) => {
		const orderProducts: any[] = await req.json();
		const orderId = new Date().getTime();

		orderProducts.forEach(({ productId, option }) => {
			const foundProduct = products.find((product) => product.id == productId);
			if (!foundProduct) return;

			carts.push({
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
