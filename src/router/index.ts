import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
	},
	{
		path: '/product/:product_id',
		name: 'ProductDetail',
		component: () => import(/* webpackChunkName: "about" */ '../views/product/ProductDetail.vue'),
	},
	{
		path: '/order/:orderId',
		name: 'Order',
		component: () => import(/* webpackChunkName: "about" */ '../views/order/OrderForm.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
