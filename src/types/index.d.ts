import { priceFormat } from '@/utils/format';

declare module 'vue' {
	interface ComponentCustomProperties {
		$priceFormat: typeof priceFormat;
	}
}
