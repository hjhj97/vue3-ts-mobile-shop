import axios from '@/plugins/axiosSetup';

export const requestOrder = async () => {
	const res = await axios.post(`/order`);
	return res.data;
};

export const getOrderInfo = async (orderId: number | string) => {
	const res = await axios.get(`/order/${orderId}`);
	return res.data;
};
