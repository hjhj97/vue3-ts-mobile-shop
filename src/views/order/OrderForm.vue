<template>
	<div class="no-footer bottom-fixed">
		<form @submit="handleSubmit" class="order-form">
			<div class="order-section">
				<OrderProduct v-bind="{ product }" />
			</div>
			<div class="order-section">
				<OrderDelivery />
			</div>

			<div class="order-section">
				<OrderPayment />
			</div>

			<BottomFixed>
				<Button theme="primary" @click="onClickPay">결제하기</Button>
			</BottomFixed>
		</form>
	</div>
</template>

<script lang="ts">
	// 컴포넌트
	import OrderDelivery from '@/components/order/OrderDelivery.vue';
	import BottomFixed from '@/components/control/BottomFixed.vue';
	import Button from '@/components/control/Button.vue';
	import OrderProduct from '@/components/order/OrderProduct.vue';
	import OrderPayment from '@/components/order/OrderPayment.vue';
	// vue 라이브러리
	import { defineComponent, onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	// API
	import { getOrderInfo } from '@/api/order';

	export default defineComponent({
		components: { BottomFixed, Button, OrderProduct, OrderDelivery, OrderPayment },
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

<style lang="scss" scoped>
	.order-form {
		& .order-section {
			border-top: 10px solid #eee;
		}
	}
</style>
