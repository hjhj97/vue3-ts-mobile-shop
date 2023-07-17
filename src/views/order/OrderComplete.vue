<template>
	<div class="order-complete">
		<h1>주문이 완료되었습니다</h1>
		<div class="order-section">
			<OrderProductComp v-for="product in orderedProducts" :key="product.id" v-bind="{ product }" />
		</div>

		<div class="order-info">
			<h2>주문 정보</h2>
			<div class="info-row">
				<span class="info-label">이름</span>
				<span class="info-data">{{ deliveryInfo?.name }}</span>
			</div>
			<div class="info-row">
				<span class="info-label">연락처</span>
				<span class="info-data">{{ deliveryInfo?.contact }}</span>
			</div>
			<div class="info-row">
				<span class="info-label">이메일</span>
				<span class="info-data">{{ deliveryInfo?.email }}</span>
			</div>
			<div class="info-row">
				<span class="info-label">주소</span>
				<span class="info-data">{{
					deliveryInfo?.address + deliveryInfo?.addressDetail || ''
				}}</span>
			</div>
		</div>

		<div class="order-info">
			<h2>결제 정보</h2>
			<div class="info-row">
				<span class="info-label">결제 금액</span>
				<span class="info-data">{{ $priceFormat(paymentInfo?.payPrice) }}원</span>
			</div>
			<div class="info-row">
				<span class="info-label">결제 수단</span>
				<span class="info-data">{{ PAY_METHOD_NAME[paymentInfo?.payMethod] }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	// 컴포넌트
	import OrderProductComp from '@/components/order/OrderProduct.vue';
	// vue 라이브러리
	import { defineComponent, onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	// API
	import { getOrderInfo } from '@/api/order';
	// Type
	import { OrderDelivery, OrderPayment, OrderProduct, PAY_METHOD_NAME } from '@/types/order';

	export default defineComponent({
		components: { OrderProductComp },
		setup() {
			const route = useRoute();
			const orderId = route.params.orderId as string;

			const orderedProducts = ref<OrderProduct[]>([]);
			const deliveryInfo = ref<OrderDelivery>({} as OrderDelivery);
			const paymentInfo = ref<OrderPayment>({} as OrderPayment);

			onMounted(() => {
				fetchData();
			});

			const fetchData = async () => {
				const res = await getOrderInfo(orderId).catch();
				if (res?.data) {
					orderedProducts.value = res.data.products;
					deliveryInfo.value = res.data.products[0].deliveryInfo;
					paymentInfo.value = res.data.products[0].paymentInfo;
				}
			};

			return {
				deliveryInfo,
				paymentInfo,
				orderedProducts,
				PAY_METHOD_NAME,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.order-complete {
		margin-top: var(--space-small);
		padding: 0 var(--space-x-small);
		min-height: 100vh;

		& h1 {
			font-size: var(--font-size-small);
			font-weight: bold;
		}

		& .order-section {
			display: flex;
			flex-direction: column;
			gap: var(--space-x-small);
			margin-top: var(--space-small);
		}

		& .order-info {
			display: flex;
			flex-direction: column;
			gap: var(--space-small);
			margin-top: var(--space-small);

			& h2 {
				margin-top: var(--space-small);
				font-size: var(--font-size-x-small);
				font-weight: bold;
			}

			& .info-row {
				display: flex;

				& .info-label {
					color: #999;
					width: 25%;
				}
			}
		}
	}
</style>
