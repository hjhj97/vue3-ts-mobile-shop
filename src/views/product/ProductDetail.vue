<template>
	<div class="product-detail">
		<div class="product-detail-top">
			<div class="product-image-wrapper">
				<img :src="product.image" />
			</div>
			<div class="product-info">
				<span class="product-brand">{{ product.brand }}</span>
				<span class="product-title">{{ product.title }}</span>
				<span class="product-price">{{ $priceFormat(product.price) }} 원</span>
			</div>
		</div>

		<div class="product-detail-body">
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt praesentium et autem,
				placeat cumque blanditiis maiores delectus odit sint illo fugiat aperiam nulla odio aut,
				obcaecati quod modi nihil nobis recusandae, voluptate architecto. Nemo sed repudiandae
				sapiente, ut porro sint, cum asperiores quos quis eum officia ad natus dicta provident quod
				ipsam nobis blanditiis corporis maiores cumque beatae modi totam numquam esse! Assumenda,
				tempora cupiditate. Quibusdam, in harum magnam, omnis earum molestias sit non excepturi, aut
				sint necessitatibus fugit consequatur quaerat suscipit. Eum, odit nobis? Repellat impedit
				enim non beatae consequuntur dicta, sapiente deserunt aspernatur consequatur placeat
				eligendi soluta cumque nobis, distinctio earum natus in pariatur nisi odio nesciunt aperiam
				neque magni quisquam. Adipisci excepturi impedit quod nisi libero, atque quas, facere sequi
				iusto expedita omnis obcaecati eos odio enim odit beatae reprehenderit! Maxime, saepe
				cupiditate? Nulla non, esse quod eligendi officia dicta eveniet sit placeat numquam
				similique nemo magnam, recusandae incidunt necessitatibus, nihil pariatur! Dolorum, vero.
				Repellat neque error delectus, odit velit optio dolore maxime dignissimos! Nemo dolorem
				illum recusandae, nulla soluta veritatis, corporis magni tempora consequatur deleniti sed
				nam amet? Quam voluptate alias sequi quae sapiente, labore deleniti laborum aliquam
				recusandae nam odio repudiandae tenetur exercitationem esse similique?
			</p>
		</div>

		<BottomFixed>
			<Button theme="primary" @click="onClickBuy">구매하기</Button>
		</BottomFixed>

		<TeleportModal v-if="isOpen">
			<ProductDetailBS @close-modal="onCloseModal" />
		</TeleportModal>
	</div>
</template>

<script lang="ts">
	import Button from '@/components/control/Button.vue';
	import BottomFixed from '@/components/control/BottomFixed.vue';
	import TeleportModal from '@/components/modal/TeleportModal.vue';
	import ProductDetailBS from '@/components/modal/bottomsheet/ProductDetailBS.vue';
	import { defineComponent, onMounted, ref } from 'vue';
	import useModal from '@/compositions/useModal';
	import { getProductById } from '@/api/product';
	import { useRoute } from 'vue-router';

	export default defineComponent({
		components: { BottomFixed, Button, TeleportModal, ProductDetailBS },
		setup() {
			const route = useRoute();
			const product = ref({});
			const product_id = route.params.product_id as string;
			const { openModal, closeModal, isOpen } = useModal();

			onMounted(() => {
				fetchData();
			});

			const onClickBuy = () => {
				openModal();
			};

			const onCloseModal = () => {
				closeModal();
			};

			const fetchData = async () => {
				const res = await getProductById(product_id).catch();
				if (res?.data) {
					product.value = res.data?.product;
				}
			};

			return {
				product,
				isOpen,
				onClickBuy,
				onCloseModal,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.product-detail {
		& .product-detail-top {
			& .product-image-wrapper {
				& img {
					object-fit: contain;
					width: 100%;
				}
			}

			& .product-info {
				display: flex;
				flex-direction: column;
				gap: var(--space-xx-small);
				margin: 0 var(--space-x-small);

				& .product-brand {
					font-size: var(--font-size-xx-small);
					font-weight: bold;
				}
				& .product-title {
					font-size: var(--font-size-x-small);
				}
			}
		}

		& .product-detail-body {
			margin: 1rem var(--space-x-small);
		}
	}
</style>
