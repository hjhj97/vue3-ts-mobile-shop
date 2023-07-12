import { OrderOption } from '@/components/modal/bottomsheet/ProductDetailBS.vue';
import { Product } from './product';

export interface OrderDelivery {
	name: string;
	contact: string;
	email: string;
	zipcd: string;
	address: string;
	addressDetail?: string;
}

export interface OrderPayment {
	payPrice: number;
	payMethod: PayMethod;
}

export interface OrderForm {
	//id: number;
	productInfo: Product;
	orderId: number;
	options: OrderOption[];
	deliveryInfo: OrderDelivery;
	paymentInfo: OrderPayment;
}

export enum PayMethod {
	KAKAO = 'KAKAO',
	NAVER = 'NAVER',
	TOSS = 'TOSS',
	ACCOUNT = 'ACCOUNT',
}
export const PAY_METHOD_NAME: { [method in PayMethod]: string } = {
	[PayMethod.KAKAO]: '카카오페이',
	[PayMethod.NAVER]: '네이버페이',
	[PayMethod.TOSS]: '토스페이',
	[PayMethod.ACCOUNT]: '무통장입금',
};
