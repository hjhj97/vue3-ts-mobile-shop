import { OrderForm } from '@/types/order';
import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
	state: () => {
		return {
			order: {} as OrderForm,
		};
	},
	actions: {},
});
