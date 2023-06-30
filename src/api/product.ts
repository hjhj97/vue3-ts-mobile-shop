import axios from '@/plugins/axiosSetup';

export const getProducts = async () => {
	const res = await axios.get('/products');
	return res.data;
};
export const getProductById = async (id: string | number) => {
	const res = await axios.get(`/products/${id}`);
	return res.data;
};
