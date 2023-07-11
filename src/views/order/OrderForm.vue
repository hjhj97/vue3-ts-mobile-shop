<template>
	<div class="no-footer bottom-fixed">
		<form @submit="onSubmit" class="order-form">
			<div class="order-section">
				<h2>
					주문상품
					{{ selectedOption.length }} 건
				</h2>
				<OrderProduct
					v-bind="{ product, option }"
					v-for="option in selectedOption"
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
	import { computed, defineComponent, onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import { getTotalPrice } from '@/utils/price';
	import router from '@/router';
	// API
	import { getOrderInfo, requestPay } from '@/api/order';
	// npm 라이브러리
	import { useForm } from 'vee-validate';
	// Type
	import { OrderForm } from '@/types/order';
	import { Product } from '@/types/product';
	import { OrderOption } from '@/components/modal/bottomsheet/ProductDetailBS.vue';

	export default defineComponent({
		components: { BottomFixed, Button, OrderProduct, OrderDelivery, OrderPayment },
		setup() {
			const { handleSubmit, validate } = useForm<OrderForm>();
			const route = useRoute();
			const orderId = route.params.orderId as string;

			const product = ref<Product>({} as Product);
			const selectedOption = ref<OrderOption[]>([]);

			const totalPrice = computed(() => {
				return getTotalPrice(selectedOption);
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

			const onRequestPay = handleSubmit(async (orderData: OrderForm) => {
				orderData.id = product.value.id;
				orderData.options = selectedOption.value;

				const res = await requestPay(orderId, orderData);
				router.replace({ name: 'OrderComplete', params: { orderId } });
			});

			const fetchData = async () => {
				const res = await getOrderInfo(orderId).catch();
				if (res?.data) {
					product.value = res.data.product;
					selectedOption.value = res.data.order.option;
				}
			};

			return {
				totalPrice,
				selectedOption,
				product,
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
