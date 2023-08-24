<template>
	<div>
		<ul class="product-list">
			<router-link
				:to="{ name: 'ProductDetail', params: { productId: product.id } }"
				v-for="product in products"
				:key="product.id"
				class="product-item"
			>
				<div class="product-image-wrapper">
					<img :src="product.image" />
				</div>
				<div class="product-info">
					<span class="product-brand">{{ product.brand }}</span>
					<span class="product-title">{{ product.title }}</span>

					<ProductRating v-bind="{ product }" />
					<span class="product-price">{{ $priceFormat(product.price) }} 원</span>
				</div>
			</router-link>
		</ul>
	</div>
</template>

<script lang="ts">
	import { Product } from '@/types/product';
	import { defineComponent, PropType } from 'vue';
	import ProductRating from '../product/ProductRating.vue';

	export default defineComponent({
		components: { ProductRating },
		props: {
			products: Array as PropType<Product[]>,
		},
	});
</script>

<style lang="scss" scoped>
	.product-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-x-small);
		margin: 2rem 1rem;

		& .product-item {
			padding: var(--space-xx-small);
			display: flex;
			flex-direction: column;
			gap: var(--space-small);

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
				font-size: var(--font-size-xxx-small);
				font-weight: bold;
			}
			& .product-title {
				font-size: var(--font-size-xx-small);
				font-weight: 400;
			}

			& .product-price {
				font-size: var(--font-size-x-small);
				font-weight: 600;
			}
		}
	}
</style>
