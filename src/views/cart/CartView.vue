<template>
	<div class="cart">
		<h2>장바구니</h2>
		<div class="cart-wrapper">
			<div class="cart-list-wrapper" v-if="orderProducts?.length > 0">
				<OrderProductComp
					v-bind="{ product }"
					:deleteButton="true"
					v-for="product in orderProducts"
					:key="product.id"
					@delete-cart-item="onDeleteCartItem"
				/>
			</div>
			<p v-else>장바구니에 담은 상품이 없습니다.</p>
		</div>
	</div>
</template>

<script lang="ts">
	import OrderProductComp from '@/components/order/OrderProduct.vue';
	import { defineComponent, onMounted, ref } from 'vue';
	import { deleteCartItem, getCartList } from '@/api/cart';
	import { OrderProduct } from '@/types/order';

	export default defineComponent({
		components: { OrderProductComp },
		setup() {
			const orderProducts = ref<any[]>([]);
			onMounted(() => {
				fetchData();
			});

			const fetchData = async () => {
				const res = await getCartList().catch();

				orderProducts.value = res.data.carts;
			};

			const onDeleteCartItem = async (data: OrderProduct) => {
				await deleteCartItem({ productId: data.id }).catch();
				await fetchData();
			};

			return {
				orderProducts,
				onDeleteCartItem,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.cart {
		margin: var(--space-small);
		& h2 {
			font-size: var(--font-size-small);
			font-weight: bold;
		}

		& .cart-wrapper {
			height: 100vh;
			margin-top: var(--space-x-small);
		}
		& .cart-list-wrapper {
			display: flex;
			flex-direction: column;
			gap: var(--space-small);
		}
	}
</style>
