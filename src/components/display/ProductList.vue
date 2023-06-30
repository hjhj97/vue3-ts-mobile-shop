<template>
	<div>
		<ul class="product-list">
			<router-link
				:to="{ name: 'ProductDetail', params: { product_id: product.id } }"
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
					<span class="product-price">{{ $priceFormat(product.price) }} 원</span>
				</div>
			</router-link>
		</ul>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		props: {
			products: Array,
		},
		setup() {
			return {};
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
