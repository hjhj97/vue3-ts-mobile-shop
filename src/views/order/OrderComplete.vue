<template>
	<div class="order-complete">
		<h1>주문이 완료되었습니다</h1>
		<div>
			<OrderProduct
				v-for="option in selectedOption"
				:key="option.optionId"
				v-bind="{ product, option }"
			/>
		</div>

		<div></div>
	</div>
</template>

<script lang="ts">
	// 컴포넌트
	import OrderProduct from '@/components/order/OrderProduct.vue';
	// vue 라이브러리
	import { defineComponent, onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	// API
	import { getCompletedOrderInfo, getOrderInfo } from '@/api/order';
	// Type
	import { Product } from '@/types/product';
	import { OrderOption } from '@/components/modal/bottomsheet/ProductDetailBS.vue';

	export default defineComponent({
		components: { OrderProduct },
		setup() {
			const route = useRoute();
			const orderId = route.params.orderId as string;

			const product = ref<Product>({} as Product);
			const selectedOption = ref<OrderOption[]>([]);

			onMounted(() => {
				fetchData();
			});

			const fetchData = async () => {
				const res = await getOrderInfo(orderId).catch();
				if (res?.data) {
					product.value = res.data.product;
					selectedOption.value = res.data.order.option;
				}
			};

			return {
				product,
				selectedOption,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.order-complete {
		margin-top: var(--space-small);
		& h1 {
			padding: 0 var(--space-small);
			font-size: var(--font-size-x-small);
			font-weight: bold;
		}
	}
</style>
