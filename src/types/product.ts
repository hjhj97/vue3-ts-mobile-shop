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
}
