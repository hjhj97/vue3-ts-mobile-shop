<template>
	<div class="order-payment">
		<h2>결제 수단</h2>
		<div class="payment-list">
			<div
				v-for="method in PayMethod"
				:key="method"
				class="payment-item"
				:class="{ on: selectedPayMethod === method }"
				@click="selectedPayMethod = method"
			>
				{{ PAY_METHOD_NAME[method] }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { PayMethod, PAY_METHOD_NAME } from '@/types/order';

	export default defineComponent({
		setup() {
			const selectedPayMethod = ref<PayMethod>(PayMethod.KAKAO);
			return {
				PAY_METHOD_NAME,
				PayMethod,
				selectedPayMethod,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.order-payment {
		margin: 1rem;
		& h2 {
			font-size: var(--font-size-x-small);
			font-weight: bold;
		}

		& .payment-list {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			width: 100%;
			margin-top: 1rem;

			& .payment-item {
				display: flex;
				justify-content: center;
				background-color: rgba(0, 0, 0, 0.05);
				width: calc(calc(100% - 2rem) / 2);
				padding: 1rem 0.3rem;
				border: 1.2px solid #ddd;
				border-radius: 10px;
				&.on {
					border-color: var(--color-primary);
				}
			}
		}
	}
</style>
