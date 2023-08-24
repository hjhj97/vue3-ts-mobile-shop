<template>
	<div class="cart">
		<div class="cart-top">
			<h2>장바구니</h2>
			<div v-if="orderProducts?.length > 0">
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
					:default-check="checkIncluded(product.id)"
					:in-cart-page="true"
					@delete-cart-item="onDeleteCartItem"
					@select-cart-item="onSelectCartItem"
				/>

				<BottomFixed>
					<Button
						theme="primary"
						@click="onClickCartOrder"
						:disabled="selectedProducts.length === 0"
						>총 {{ $priceFormat(totalPrice) }}원 주문하기</Button
					>
				</BottomFixed>
			</div>
			<p v-else>장바구니에 담은 상품이 없습니다.</p>
		</div>
	</div>
</template>

<script lang="ts">
	// 컴포넌트
	import BottomFixed from '@/components/control/BottomFixed.vue';
	import Button from '@/components/control/Button.vue';
	import OrderProductComp from '@/components/order/OrderProduct.vue';
	// vue 라이브러리
	import { computed, defineComponent, onMounted, ref } from 'vue';
	import { useOrderStore } from '@/stores/order';
	import router from '@/router';
	// composition
	import { getTotalPrice } from '@/utils/price';
	// API
	import { deleteCartItem, getCartList } from '@/api/cart';
	// Type
	import { OrderProduct } from '@/types/order';

	export default defineComponent({
		components: { OrderProductComp, BottomFixed, Button },
		setup() {
			const orderProducts = ref<OrderProduct[]>([]);
			const selectedProducts = ref<OrderProduct[]>([]);
			const orderStore = useOrderStore();
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

			const totalPrice = computed(() =>
				selectedProducts.value.reduce((acc, product) => acc + getTotalPrice(product.options), 0),
			);

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

			const onClickCartOrder = async () => {
				const orderArray = selectedProducts.value.map((product) => ({
					productId: product.id,
					option: product.options,
				}));

				const orderId = await orderStore.REQUEST_ORDER(orderArray);
				if (orderId) {
					router.push({ name: 'Order', params: { orderId } });
				}
			};

			return {
				selectedProducts,
				orderProducts,
				isSelectAll,
				totalPrice,
				//
				onDeleteCartItem,
				onSelectCartItem,
				onClickCartOrder,
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
