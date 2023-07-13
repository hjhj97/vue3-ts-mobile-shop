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

export enum OrderType {
	DIRECT = 'DIRECT', // 바로구매
	CART = 'CART', // 장바구니
}

export type OrderProduct = Omit<Product, 'options'> & { options: OrderOption[] };

export interface OrderForm {
	orderId: number; // 주문번호
	productInfo: OrderProduct[];
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
