<template>
	<div>
		<ul class="product-list">
			<li v-for="product in products" :key="product.id" class="product-item">
				<div class="product-image-wrapper">
					<img :src="product.image" />
				</div>
				<div class="product-info">
					<span class="product-brand">{{ product.brand }}</span>
					<span class="product-title">{{ product.title }}</span>
					<span class="product-price">{{ $priceFormat(product.price) }} 원</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	const products = [
		{
			id: 1,
			title: 'MacBook Air 15',
			brand: 'Apple',
			price: 1890000,
			category: 'Mac',
			image:
				'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mba15-midnight-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684518479433',
		},
		{
			id: 2,
			title: 'iPad Pro',
			brand: 'Apple',
			price: 1249000,
			category: 'iPad',
			image:
				'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-comp-pro-202210?wid=338&hei=386&fmt=jpeg&qlt=90&.v=1664411153112',
		},

		{
			id: 3,
			title: 'iPhone 14 Pro',
			brand: 'Apple',
			price: 1550000,
			category: 'iPhone',
			image:
				'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-compare-iphone-14-pro-202209?wid=366&hei=508&fmt=jpeg&qlt=90&.v=1661471046256',
		},
		{
			id: 4,
			title: 'iPhone 14',
			brand: 'Apple',
			price: 1250000,
			category: 'iPhone',
			image:
				'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-compare-iphone-14-202209?wid=364&hei=508&fmt=jpeg&qlt=90&.v=1660759995969',
		},
	];

	export default defineComponent({
		setup() {
			return {
				products,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.product-list {
		flex-wrap: wrap;
		display: flex;
		gap: 1rem;
		margin: 2rem 1rem;

		& .product-item {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			width: calc(calc(100% / 2) - 1rem);
			padding: 0.2rem;

			& .product-image-wrapper {
				width: 100%;
				/*border: 0.3px solid #aaa;*/
				border-radius: 10px;
				& img {
					height: 220px;
					object-fit: contain;
					width: 100%;
				}
			}

			& .product-info {
				display: flex;
				flex-direction: column;
				gap: var(--space-xx-small);
			}

			& .product-brand {
				font-size: var(--font-size-xx-small);
				font-weight: bold;
			}
			& .product-title {
				font-size: var(--font-size-xx-small);
				font-weight: 500;
			}

			& .product-price {
				font-size: var(--font-size-x-small);
				font-weight: bold;
			}
		}
	}
</style>
