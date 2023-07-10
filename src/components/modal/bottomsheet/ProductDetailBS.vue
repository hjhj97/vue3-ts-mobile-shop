<template>
	<div class="bs">
		<div class="bs-wrapper">
			<div @click="$emit('close-modal')" class="bs-top-btn">
				<img src="@/assets/image/icon/x.svg" />
			</div>
			<div class="bs-content">
				<ul class="option-list">
					<li class="option-item" v-for="option in selectedOption" :key="option.optionId">
						<div class="option-list__top">
							<span> {{ option.optionTitle }} {{ $priceFormat(option.optionPrice) }}원</span>
						</div>

						<ProductAmount v-bind="{ option }" @change-amount="onChangeAmount" />
					</li>
				</ul>
			</div>

			<div class="bs-bottom">
				<Button theme="primary" @click="onRequestOrder"
					>총 {{ $priceFormat(totalPrice) }}원 구입</Button
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	// 컴포넌트
	import Button from '@/components/control/Button.vue';
	import ProductAmount from '@/components/product/ProductAmount.vue';
	// vue 라이브러리
	import { computed, defineComponent, PropType, ref } from 'vue';
	import router from '@/router';
	// API
	import { requestOrder } from '@/api/order';
	// Type
	import { ProductOption } from '@/types/product';
	import { useRoute } from 'vue-router';

	type OrderOption = ProductOption & { amount: number };

	export default defineComponent({
		components: { Button, ProductAmount },
		props: {
			options: {
				type: Array as PropType<ProductOption[]>,
				required: true,
			},
		},
		emits: ['close-modal'],
		setup(props) {
			const route = useRoute();
			const productId = route.params.productId as string;

			const selectedOption = ref<OrderOption[]>(
				props.options.map((option) => ({
					...option,
					amount: 0,
				})),
			);

			const totalPrice = computed(() =>
				selectedOption.value.reduce((acc, cur) => acc + cur.optionPrice * cur.amount, 0),
			);

			const onRequestOrder = async () => {
				console.log(productId);
				const res = await requestOrder({ productId, option: selectedOption.value }).catch();
				if (res?.data) {
					const { order } = res.data;
					router.push({ name: 'Order', params: { orderId: order.orderId } });
				}
			};

			const onChangeAmount = ({ optionId, amount }: any) => {
				const found = selectedOption.value.findIndex((option) => option.optionId === optionId);

				selectedOption.value[found].amount = amount;
			};

			return {
				totalPrice,
				selectedOption,
				//
				onRequestOrder,
				onChangeAmount,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.bs {
		position: absolute;
		bottom: 0;
		height: auto;
		width: 100%;
		background-color: #fff;
		border-radius: 3% 3% 0 0;

		& .bs-wrapper {
			height: 50vh;
			padding: 1rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			& .bs-top-btn {
				display: flex;
				justify-content: flex-end;
			}

			& .bs-content {
				& .option-list {
					display: flex;
					flex-direction: column;
					gap: var(--space-x-small);

					& .option-item {
						display: flex;
						flex-direction: column;
						gap: var(--space-xx-small);
						padding: 0.7rem 0.5rem;
						border-radius: 0.2rem;
						box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.08);
						box-sizing: border-box;

						& .option-list__top {
						}
					}
				}
			}

			& .bs-bottom {
				width: 100%;
				position: fixed;
				display: flex;
				justify-content: center;
				align-items: center;
				bottom: 0;
				left: 0;
				right: 0;
				padding: 1rem;
				box-sizing: border-box;
			}
		}
	}
</style>
