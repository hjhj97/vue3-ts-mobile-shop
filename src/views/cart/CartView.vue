<template>
	<div class="cart">
		<div class="cart-top">
			<h2>장바구니</h2>
			<div>
				<label for="cart-select-call">모두선택</label>
				<input type="checkbox" id="cart-select-all" v-model="isSelectAll" />
			</div>
		</div>
		<div class="cart-wrapper">
			<div class="cart-list-wrapper" v-if="orderProducts?.length > 0">
				<OrderProductComp
					v-for="product in orderProducts"
					:key="product.id"
					v-bind="{ product }"
					:defaultCheck="checkIncluded(product.id)"
					:inCartPage="true"
					@delete-cart-item="onDeleteCartItem"
					@select-cart-item="onSelectCartItem"
				/>
			</div>
			<p v-else>장바구니에 담은 상품이 없습니다.</p>
		</div>
	</div>
</template>

<script lang="ts">
	import OrderProductComp from '@/components/order/OrderProduct.vue';
	import { computed, defineComponent, onMounted, ref } from 'vue';
	import { deleteCartItem, getCartList } from '@/api/cart';
	import { OrderProduct } from '@/types/order';

	export default defineComponent({
		components: { OrderProductComp },
		setup() {
			const orderProducts = ref<OrderProduct[]>([]);
			const selectedProducts = ref<OrderProduct[]>([]);
			const isSelectAll = computed<boolean>({
				get() {
					// 모든 상품이 체크되었는지 확인
					return orderProducts.value.length === selectedProducts.value.length;
				},
				set(newValue) {
					// 모두선택 체크박스 값에 따라 개별 아이템 체크 활성화
					let tmp: OrderProduct[] = [];
					if (newValue) {
						orderProducts.value.forEach((item) => tmp.push(item));
					}
					selectedProducts.value = tmp;
				},
			});

			onMounted(() => {
				fetchData();
			});

			const fetchData = async () => {
				const res = await getCartList().catch();
				orderProducts.value = res.data.carts;
			};

			const onDeleteCartItem = async (product: OrderProduct) => {
				await deleteCartItem({ productId: product.id }).catch();
				await fetchData();
			};

			const onSelectCartItem = (product: OrderProduct, checked: boolean) => {
				if (checked) {
					selectedProducts.value.push(product);
				} else {
					selectedProducts.value = selectedProducts.value.filter(
						(selected) => selected.id !== product.id,
					);
				}
			};

			const checkIncluded = (id: number) => {
				return selectedProducts.value.findIndex((selected) => selected.id === id) > -1;
			};

			return {
				selectedProducts,
				orderProducts,
				isSelectAll,
				//
				onDeleteCartItem,
				onSelectCartItem,
				checkIncluded,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.cart {
		margin: var(--space-small);

		& .cart-top {
			display: flex;
			justify-content: space-between;
			& h2 {
				font-size: var(--font-size-small);
				font-weight: bold;
			}
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
