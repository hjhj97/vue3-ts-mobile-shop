<template>
	<div class="rating-wrapper">
		<div class="star-wrapper">
			<img src="@/assets/image/icon/star.svg" />
			<span>{{ product.rating?.score }}</span>
		</div>
		<span>({{ product.rating?.count }})</span>
	</div>
</template>

<script lang="ts">
	import { Product } from '@/types/product';
	import { defineComponent, PropType } from 'vue';

	export default defineComponent({
		props: {
			product: Object as PropType<Product>,
		},
		setup() {
			return {};
		},
	});
</script>

<style lang="scss" scoped>
	.rating-wrapper {
		display: flex;
		align-items: center;
		gap: var(--space-xx-small);

		& .star-wrapper {
			display: flex;
			& img {
				width: 16px;
				height: 16px;
			}
		}
	}
</style>
