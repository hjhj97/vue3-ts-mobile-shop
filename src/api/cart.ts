import { OrderOption } from '@/components/modal/bottomsheet/ProductDetailBS.vue';
import axios from '@/plugins/axiosSetup';

export const getCartList = async () => {
	const res = await axios.get('/cart');
	return res.data;
};

export const addCart = async (payload: { productId: number; option: OrderOption[] }[]) => {
	const res = await axios.post('/cart', payload);
	return res.data;
};
