<template>
	<div class="no-footer bottom-fixed">
		<form @submit="onSubmit" class="order-form">
			<div class="order-section">
				<h2>
					주문상품
					{{ options?.length }} 건
				</h2>
				<OrderProduct
					v-bind="{ option }"
					:product="productInfo"
					v-for="option in options"
					:key="option.optionId"
				/>
			</div>
			<div class="order-section">
				<OrderDelivery />
			</div>

			<div class="order-section">
				<OrderPayment />
			</div>

			<BottomFixed>
				<Button type="submit" theme="primary">{{ $priceFormat(totalPrice) }}원 결제하기</Button>
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
	import { computed, defineComponent, onMounted, ref, toRefs } from 'vue';
	import { useRoute } from 'vue-router';
	import { useOrderStore } from '@/stores/order';
	import router from '@/router';
	// compositions
	import { getTotalPrice } from '@/utils/price';
	// API
	import { getOrderInfo, requestPay } from '@/api/order';
	// npm 라이브러리
	import { useForm } from 'vee-validate';
	// Type
	import { OrderForm, PayMethod } from '@/types/order';
	import { Product } from '@/types/product';
	import { OrderOption } from '@/components/modal/bottomsheet/ProductDetailBS.vue';

	export default defineComponent({
		components: { BottomFixed, Button, OrderProduct, OrderDelivery, OrderPayment },
		setup() {
			const { handleSubmit, validate } = useForm<OrderForm>();
			const route = useRoute();
			const orderId = route.params.orderId as string;

			const orderStore = useOrderStore();
			const { options, productInfo } = toRefs(orderStore.order);
			//const product = ref<Product>(orderStore.order.productInfo || {});
			//const selectedOption = ref<OrderOption[]>(orderStore.order.options || []);

			const totalPrice = computed(() => {
				if (orderStore.order.options) {
					return getTotalPrice(orderStore.order.options);
				}
				return 0;
			});

			onMounted(() => {
				fetchData();
			});

			const onSubmit = async (e: Event) => {
				e.preventDefault();

				const { valid, errors } = await validate();

				if (valid) {
					onRequestPay();
				} else {
					// errors
				}
			};

			const onRequestPay = handleSubmit(async (_: OrderForm) => {
				const { paymentInfo } = orderStore.order;
				orderStore.order.paymentInfo = { ...paymentInfo, payPrice: totalPrice.value };

				const res = await requestPay(orderStore.order).catch();
				if (res) {
					router.replace({ name: 'OrderComplete', params: { orderId } });
				}
			});

			const fetchData = async () => {
				const res = await getOrderInfo(orderId).catch();
				if (res?.data) {
					orderStore.order.productInfo = res.data.product;
					orderStore.order.options = res.data.order.option;
				}
			};

			return {
				totalPrice,
				options,
				productInfo,
				//
				onSubmit,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.order-form {
		& .order-section {
			border-top: 10px solid #eee;

			& h2 {
				font-size: var(--font-size-x-small);
				font-weight: bold;
				margin: 1rem;
			}
		}
	}
</style>
