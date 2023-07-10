<template>
	<section class="order-product">
		<div class="product-box">
			<div class="product-box-left">
				<div class="product-image-wrapper"><img :src="product?.image" /></div>
			</div>
			<div class="product-box-right">
				<div class="product-info">
					<span class="product-brand">{{ product?.brand }}</span>
					<span class="product-title">{{ product?.title }}</span>
					<span class="product-option-title">{{ option?.optionTitle }}</span>
					<div>
						<span class="product-option-price">{{ $priceFormat(optionPrice) }} 원</span>
						<span> | {{ option?.amount }}개</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import { Product } from '@/types/product';
	import { getOptionPrice } from '@/utils/price';
	import { computed, defineComponent, PropType } from 'vue';
	import { OrderOption } from '../modal/bottomsheet/ProductDetailBS.vue';

	export default defineComponent({
		props: {
			product: {
				type: Object as PropType<Product>,
				required: true,
			},
			option: {
				type: Object as PropType<OrderOption>,
				required: true,
			},
		},
		setup(props) {
			const optionPrice = computed(() => getOptionPrice(props.option, props.option.amount));
			return { optionPrice };
		},
	});
</script>

<style lang="scss" scoped>
	.order-product {
		margin: var(--space-x-small);

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
				height: 100%;
				& .product-image-wrapper {
					display: flex;
					align-items: center;
					height: 100%;
					& img {
						width: 100%;
						height: 100%;
						object-fit: contain;
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
						font-size: var(--font-size-xx--small);
						font-weight: 400;
					}
					& .product-option-title {
						font-size: var(--font-size-xxx--small);
						color: #bbb;
						font-weight: 400;
					}

					& .product-option-price {
						font-size: var(--font-size-x-small);
						font-weight: 600;
					}
				}
			}
		}
	}
</style>
