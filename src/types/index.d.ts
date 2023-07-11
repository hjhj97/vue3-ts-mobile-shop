import { priceFormat } from '@/utils/format';

declare global {
	interface Window {
		daum: any;
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$priceFormat: typeof priceFormat;
	}
}
