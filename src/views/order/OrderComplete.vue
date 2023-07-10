<template>
	<div class="">
		<h1>주문이 완료되었습니다.</h1>
		<div>
			<OrderProduct />
		</div>

		<div></div>
	</div>
</template>

<script lang="ts">
	import { getCompletedOrderInfo } from '@/api/order';
	import OrderProduct from '@/components/order/OrderProduct.vue';
	import { defineComponent, onMounted } from 'vue';
	import { useRoute } from 'vue-router';

	export default defineComponent({
		components: { OrderProduct },
		setup() {
			const route = useRoute();
			const { orderId } = route.params.orderId as string;

			onMounted(() => {
				fetchData();
			});

			const fetchData = async () => {
				const res = await getCompletedOrderInfo(orderId).catch();
			};

			return {};
		},
	});
</script>

<style lang="scss" scoped></style>
