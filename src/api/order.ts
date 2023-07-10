import axios from '@/plugins/axiosSetup';

export const requestOrder = async (payload: any) => {
	const res = await axios.post(`/order`, payload);
	return res.data;
};

export const getOrderInfo = async (orderId: number | string) => {
	const res = await axios.get(`/order/${orderId}`);
	return res.data;
};

export const requestPay = async (orderId: number | string) => {
	const res = await axios.post(`/pay/${orderId}`);
	return res.data;
};
