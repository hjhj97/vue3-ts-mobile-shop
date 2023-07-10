import { Product } from '@/types/product';

export const products: Product[] = [
	{
		id: 1,
		title: 'MacBook Air 15',
		brand: 'Apple',
		price: 1890000,
		category: 'Mac',
		rating: {
			score: 4.7,
			count: 1234,
		},
		image:
			'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mba15-midnight-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684518479433',
		options: [
			{
				optionId: 1,
				optionTitle: '기본형',
				optionPrice: 1990000,
			},
			{
				optionId: 5,
				optionTitle: '고급형',
				optionPrice: 2190000,
			},
		],
	},
	{
		id: 2,
		title: 'iPad Pro',
		brand: 'Apple',
		price: 1249000,
		category: 'iPad',
		rating: {
			score: 4.5,
			count: 231,
		},
		image:
			'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-comp-pro-202210?wid=338&hei=386&fmt=jpeg&qlt=90&.v=1664411153112',
		options: [
			{
				optionId: 2,
				optionTitle: 'option',
				optionPrice: 1990000,
			},
		],
	},

	{
		id: 3,
		title: 'iPhone 14 Pro',
		brand: 'Apple',
		price: 1550000,
		category: 'iPhone',
		rating: {
			score: 4.9,
			count: 123,
		},
		image:
			'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-compare-iphone-14-pro-202209?wid=366&hei=508&fmt=jpeg&qlt=90&.v=1661471046256',
		options: [
			{
				optionId: 3,
				optionTitle: 'option',
				optionPrice: 1990000,
			},
		],
	},
	{
		id: 4,
		title: 'iPhone 14',
		brand: 'Apple',
		price: 1250000,
		category: 'iPhone',
		rating: {
			score: 4.6,
			count: 234,
		},
		image:
			'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-compare-iphone-14-202209?wid=364&hei=508&fmt=jpeg&qlt=90&.v=1660759995969',
		options: [
			{
				optionId: 4,
				optionTitle: 'option',
				optionPrice: 1990000,
			},
		],
	},
];
