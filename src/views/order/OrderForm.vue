<template>
	<div>
		<form @submit="handleSubmit" class="order-form">
			<OrderProduct v-bind="{ product }" />
			<section class="order-delivery"></section>
			<section class="order-payment"></section>
			<BottomFixed>
				<Button theme="primary" @click="onClickPay">결제하기</Button>
			</BottomFixed>
		</form>
	</div>
</template>

<script lang="ts">
	import { defineComponent, onMounted, ref } from 'vue';
	import BottomFixed from '@/components/control/BottomFixed.vue';
	import Button from '@/components/control/Button.vue';
	import OrderProduct from '@/components/order/OrderProduct.vue';
	import { getOrderInfo } from '@/api/order';
	import { useRoute } from 'vue-router';

	export default defineComponent({
		components: { BottomFixed, Button, OrderProduct },
		setup() {
			const route = useRoute();
			const orderId = route.params.orderId as string;

			const product = ref({});

			onMounted(() => {
				fetchData();
			});

			const handleSubmit = (e: Event) => {
				e.preventDefault();
			};

			const onClickPay = () => {};

			const fetchData = async () => {
				const res = await getOrderInfo(orderId).catch();
				if (res?.data?.product) {
					product.value = res.data.product;
				}
			};

			return {
				product,
				handleSubmit,
				onClickPay,
			};
		},
	});
</script>

<style scoped>
	.order-form {
		margin: 1rem 0.7rem;
	}
</style>
