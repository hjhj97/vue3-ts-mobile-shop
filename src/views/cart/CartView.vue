<template>
	<div class="cart">
		<h1>장바구니</h1>
		<OrderProduct v-bind="{ product }" v-for="product in orderProducts" :key="product.id" />
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

<style scoped></style>
