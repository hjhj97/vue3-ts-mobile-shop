<template>
	<section class="home-display-section">
		<div>
			<MainBanner />
		</div>
	</section>
</template>

<script>
	import MainBanner from '@/components/display/MainBanner.vue';
	export default {
		components: { MainBanner },
		setup() {
			return {};
		},
	};
</script>

<style lang="scss" scoped>
	.home-display-section {
		margin-top: 1rem;
	}
</style>
