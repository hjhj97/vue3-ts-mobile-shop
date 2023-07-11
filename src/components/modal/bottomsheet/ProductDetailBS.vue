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
			<Button theme="primary" @click="onRequestOrder">
				<span v-if="totalPrice > 0"> 총 {{ $priceFormat(totalPrice) }}원 </span>
				구매</Button
			>
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
	// Type
	import { ProductOption } from '@/types/product';
	import { getTotalPrice } from '@/utils/price';

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
			const route = useRoute();
			const productId = route.params.productId as string;

			const selectedOption = ref<OrderOption[]>(
				props.options.map((option) => ({
					...option,
					amount: 0,
				})),
			);

			const totalPrice = computed(() => getTotalPrice(selectedOption));

			const onRequestOrder = async () => {
				console.log(productId);
				const res = await requestOrder({
					productId,
					option: selectedOption.value.filter((option) => option.amount > 0),
				}).catch();
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

<style lang="scss" scoped></style>
