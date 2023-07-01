<template>
	<section class="order-product">
		<h2>주문상품</h2>
		<div class="product-box">
			<div class="product-box-left">
				<div class="product-image-wrapper"><img :src="product?.image" /></div>
			</div>
			<div class="product-box-right">
				<div class="product-info">
					<span class="product-brand">{{ product?.brand }}</span>
					<span class="product-title">{{ product?.title }}</span>
					<span class="product-price">{{ $priceFormat(product?.price) }} 원</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import { defineComponent, onMounted } from 'vue';

	export default defineComponent({
		props: {
			product: Object,
		},
		setup() {
			return {};
		},
	});
</script>

<style lang="scss" scoped>
	.order-product {
		/*margin: 0 0.7rem;*/
		& h2 {
			font-size: var(--font-size-x-small);
			font-weight: bold;
			margin: 1rem 0;
		}

		& .product-box {
			display: flex;
			gap: 1rem;
			align-items: center;
			padding: 0.5rem;
			height: 120px;
			border: 1px solid #ddd;
			border-radius: 1rem;
			box-sizing: border-box;

			& .product-box-left {
				width: 30%;
				& .product-image-wrapper {
					& img {
						width: 100%;
						object-fit: cover;
					}
				}
			}

			& .product-box-right {
				display: flex;
				align-items: center;
				width: 65%;
				height: 100%;
				& .product-info {
					display: flex;
					flex-direction: column;
					gap: 0.3rem;

					& .product-brand {
						font-size: var(--font-size-xx-small);
						font-weight: bold;
					}
					& .product-title {
						font-size: var(--font-size-x-small);
						font-weight: 400;
					}

					& .product-price {
						font-size: var(--font-size-small);
						font-weight: 600;
					}
				}
			}
		}
	}
</style>
