import axios from '@/plugins/axiosSetup';
import { OrderForm } from '@/types/order';

export const requestOrder = async (payload: any) => {
	const res = await axios.post(`/order`, payload);
	return res.data;
};

export const getOrderInfo = async (orderId: number | string) => {
	const res = await axios.get(`/order/${orderId}`);
	return res.data;
};

export const requestPay = async (orderData: OrderForm) => {
	const res = await axios.post(`/pay/${orderData.orderId}`, orderData);
	return res.data;
};

export const getCompletedOrderInfo = async (orderId: number | string) => {
	const res = await axios.get(`/order/${orderId}/completed`);
	return res.data;
};
