import { modalCloseScrollRestore } from '@/compositions/useScroll';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
	},
	{
		path: '/product/:productId',
		name: 'ProductDetail',
		component: () => import(/* webpackChunkName: "about" */ '../views/product/ProductDetail.vue'),
	},
	{
		path: '/order/:orderId',
		name: 'Order',
		component: () => import(/* webpackChunkName: "about" */ '../views/order/OrderForm.vue'),
	},
	{
		path: '/order/:orderId/complete',
		name: 'OrderComplete',
		component: () => import(/* webpackChunkName: "about" */ '../views/order/OrderComplete.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(() => {
	modalCloseScrollRestore();
});

export default router;
