<template>
	<div class="cart">
		<h2>장바구니</h2>
		<div class="cart-list-wrapper">
			<template v-if="orderProducts?.length > 0">
				<OrderProduct v-bind="{ product }" v-for="product in orderProducts" :key="product.id" />
			</template>
			<p v-else>장바구니에 담은 상품이 없습니다.</p>
		</div>
	</div>
</template>

<script lang="ts">
	import OrderProduct from '@/components/order/OrderProduct.vue';
	import { defineComponent, onMounted, ref } from 'vue';
	import { getCartList } from '@/api/cart';

	export default defineComponent({
		components: { OrderProduct },
		setup() {
			const orderProducts = ref<any[]>([]);
			onMounted(() => {
				fetchData();
			});

			const fetchData = async () => {
				const res = await getCartList().catch();

				orderProducts.value = res.data.carts;
			};
			return {
				orderProducts,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.cart {
		& h2 {
			margin: var(--space-small);
			font-size: var(--font-size-small);
			font-weight: bold;
		}

		& .cart-list-wrapper {
			height: 100vh;
			margin-top: var(--space-x-small);
		}
	}
</style>
