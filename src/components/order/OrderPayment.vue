<template>
	<div class="order-payment">
		<h2>결제 수단</h2>
		<div class="payment-list">
			<div class="payment-item">카카오페이</div>
			<div class="payment-item">네이버페이</div>
			<div class="payment-item">토스페이</div>
			<div class="payment-item">무통장입금</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		setup() {
			return {};
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
			}
		}
	}
</style>
