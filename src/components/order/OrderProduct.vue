<template>
	<section class="order-product">
		<div class="product-box">
			<div v-if="deleteButton" @click="$emit('delete-cart-item', product)" class="cart-delete-btn">
				<img src="@/assets/image/icon/x.svg" />
			</div>
			<div class="product-wrap">
				<div class="product-box-left">
					<div class="product-image-wrapper"><img :src="product?.image" /></div>
				</div>
				<div class="product-box-right">
					<div class="product-info">
						<span class="product-brand">{{ product?.brand }}</span>
						<span class="product-title">{{ product?.title }}</span>
					</div>
				</div>
			</div>

			<ul class="option-list">
				<li class="option-item" v-for="option in product.options" :key="option.optionId">
					<div class="option-list__top">
						<span> {{ option.optionTitle }} {{ $priceFormat(option.optionPrice) }}원</span>
					</div>

					<ProductAmount
						v-bind="{ option }"
						:initialAmount="option.amount"
						:isAmountChangeable="false"
					/>
				</li>
			</ul>
		</div>
	</section>
</template>

<script lang="ts">
	import { OrderProduct } from '@/types/order';
	import { getOptionPrice } from '@/utils/price';
	import { computed, defineComponent, PropType } from 'vue';
	import ProductAmount from '../product/ProductAmount.vue';

	export default defineComponent({
		components: { ProductAmount },
		emits: ['delete-cart-item'],
		props: {
			product: {
				type: Object as PropType<OrderProduct>,
				required: true,
			},
			deleteButton: {
				type: Boolean,
				default: false,
			},
		},
		setup(props) {
			const optionPrice = computed(() => getOptionPrice(props.product.options[0]));
			return { optionPrice };
		},
	});
</script>

<style lang="scss" scoped>
	.order-product {
		/*margin: var(--space-x-small);*/

		& .product-box {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding: 0.5rem;
			height: auto;
			border: 1px solid #ddd;
			border-radius: var(--space-xx-small);
			box-sizing: border-box;

			& .cart-delete-btn {
				display: flex;
				justify-content: flex-end;
			}

			& .product-wrap {
				display: flex;
				width: 100%;
				gap: var(--space-x-small);

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
					flex-direction: column;
					width: 65%;
					height: 100%;
					& .product-info {
						display: flex;
						flex-direction: column;
						justify-content: center;
						gap: 0.3rem;
						height: 100px;

						& .product-brand {
							font-size: var(--font-size-xx-small);
							font-weight: bold;
						}
						& .product-title {
							font-size: var(--font-size-xx--small);
							font-weight: 400;
						}
					}
				}
			}

			& .option-list {
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				width: 100%;
				gap: var(--space-x-small);

				& .option-item {
					display: flex;
					flex-direction: column;
					gap: var(--space-xx-small);
					padding: 0.7rem 0.5rem;
					border-radius: 0.2rem;
					box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.08);
					box-sizing: border-box;
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
</style>
