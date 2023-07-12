import { OrderOption } from '@/components/modal/bottomsheet/ProductDetailBS.vue';
import { ProductOption } from '@/types/product';

export const getTotalPrice = (selectedOption: OrderOption[]) =>
	selectedOption.reduce((acc, cur) => acc + cur.optionPrice * cur.amount, 0);

export const getOptionPrice = (option: { optionPrice: number }, amount: number) =>
	option.optionPrice * amount;
