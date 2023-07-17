import { requestOrder } from '@/api/order';
import { OrderOption } from '@/components/modal/bottomsheet/ProductDetailBS.vue';
import { OrderForm } from '@/types/order';
import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
	state: () => {
		return {
			order: {} as OrderForm,
		};
	},
	actions: {
		async REQUEST_ORDER(orderProduct: { productId: number; option: OrderOption[] }[]) {
			const res = await requestOrder(orderProduct).catch();
			if (res) {
				console.log(res.data);
				const { orderId } = res.data;
				this.order.orderId = orderId;
				return orderId;
			}
		},
	},
});
