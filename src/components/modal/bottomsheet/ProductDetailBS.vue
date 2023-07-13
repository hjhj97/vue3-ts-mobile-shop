<template>
	<BaseBS @close-modal="$emit('close-modal')">
		<template #content>
			<ul class="option-list">
				<li class="option-item" v-for="option in selectedOption" :key="option.optionId">
					<div class="option-list__top">
						<span> {{ option.optionTitle }} {{ $priceFormat(option.optionPrice) }}원</span>
					</div>

					<ProductAmount v-bind="{ option }" @change-amount="onChangeAmount" />
				</li>
			</ul>
		</template>

		<template #bottom>
			<div class="button-wrapper">
				<Button theme="secondary" @click="onAddCart"> 장바구니 담기 </Button>
				<Button theme="primary" @click="onRequestOrder"> 구매 </Button>
			</div>
		</template>
	</BaseBS>
</template>

<script lang="ts">
	// 컴포넌트
	import Button from '@/components/control/Button.vue';
	import ProductAmount from '@/components/product/ProductAmount.vue';
	import BaseBS from './BaseBS.vue';
	// vue 라이브러리
	import { computed, defineComponent, PropType, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import router from '@/router';
	// API
	import { requestOrder } from '@/api/order';
	import { addCart } from '@/api/cart';
	// Type
	import { ProductOption } from '@/types/product';
	import { getTotalPrice } from '@/utils/price';
	import { useOrderStore } from '@/stores/order';

	export type OrderOption = ProductOption & { amount: number };

	export default defineComponent({
		components: { Button, ProductAmount, BaseBS },
		props: {
			options: {
				type: Array as PropType<ProductOption[]>,
				required: true,
			},
		},
		emits: ['close-modal'],
		setup(props) {
			const orderStore = useOrderStore();
			const route = useRoute();
			const productId = route.params.productId as string;

			const selectedOption = ref<OrderOption[]>(
				props.options.map((option) => ({
					...option,
					amount: 0,
				})),
			);

			const totalPrice = computed(() => getTotalPrice(selectedOption.value));

			const onRequestOrder = async () => {
				// 상품과 선택된 옵션에 대한 정보 전달함
				const orderProduct = [
					{
						productId: parseInt(productId),
						option: selectedOption.value.filter((option) => option.amount > 0),
					},
				];

				const res = await requestOrder(orderProduct).catch();
				if (res) {
					const { orderId } = res.data;
					orderStore.order.orderId = orderId;
					router.push({ name: 'Order', params: { orderId } });
				}
			};

			const onChangeAmount = ({ optionId, amount }: any) => {
				const found = selectedOption.value.findIndex((option) => option.optionId === optionId);

				selectedOption.value[found].amount = amount;
			};

			const onAddCart = async () => {
				const orderProduct = [
					{
						productId: parseInt(productId),
						option: selectedOption.value.filter((option) => option.amount > 0),
					},
				];

				const res = await addCart(orderProduct).catch();
			};

			return {
				totalPrice,
				selectedOption,
				//
				onRequestOrder,
				onChangeAmount,
				onAddCart,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.option-list {
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
		}
	}

	.button-wrapper {
		display: flex;
		gap: var(--space-xx-small);
		width: 100%;
	}
</style>
