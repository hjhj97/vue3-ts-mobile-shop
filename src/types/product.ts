export interface Product {
	id: number;
	title: string;
	brand: string;
	price: number;
	category: string;
	rating: {
		score: number;
		count: number;
	};
	image: string;
	options: ProductOption[];
}

export interface ProductOption {
	optionId: number;
	optionTitle: string;
	optionPrice: number;
}
