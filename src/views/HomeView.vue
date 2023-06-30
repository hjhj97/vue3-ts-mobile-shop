<template>
	<section class="home-display-section">
		<MainBanner />
	</section>
	<section class="home-display-section">
		<ThemeDisplay />
	</section>
	<section class="home-display-section">
		<ProductList v-bind="{ products }" />
	</section>
</template>

<script>
	import MainBanner from '@/components/display/MainBanner.vue';
	import ThemeDisplay from '@/components/display/ThemeDisplay.vue';
	import ProductList from '@/components/display/ProductList.vue';
	import { getProducts } from '@/api/product';
	import { onMounted, ref } from 'vue';

	export default {
		components: { MainBanner, ThemeDisplay, ProductList },
		setup() {
			const products = ref([]);
			onMounted(() => {
				fetchData();
			});

			const fetchData = async () => {
				const res = await getProducts().catch();
				if (res?.data) {
					products.value = res.data?.products;
				}
			};

			return {
				products,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.home-display-section {
		margin: 1rem 0;
	}
</style>
