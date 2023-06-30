<template>
	<section class="home-display-section">
		<MainBanner />
	</section>
	<section class="home-display-section">
		<ThemeDisplay />
	</section>
	<section class="home-display-section">
		<ProductList />
	</section>
</template>

<script>
	import MainBanner from '@/components/display/MainBanner.vue';
	import ThemeDisplay from '@/components/display/ThemeDisplay.vue';
	import ProductList from '@/components/display/ProductList.vue';
	import { getProducts } from '@/api/product';
	import { onMounted } from 'vue';

	export default {
		components: { MainBanner, ThemeDisplay, ProductList },
		setup() {
			const fetchData = async () => {
				const res = await getProducts().catch();
				console.log(res);
			};

			onMounted(() => {
				fetchData();
			});
		},
	};
</script>

<style lang="scss" scoped>
	.home-display-section {
		margin: 1rem 0;
	}
</style>
