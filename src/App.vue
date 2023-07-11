<template>
	<mobile-layout>
		<Header />
		<router-view />
		<Footer />
	</mobile-layout>
</template>
<script lang="ts">
	import { defineComponent, onMounted } from 'vue';
	import Footer from './components/common/Footer.vue';
	import Header from './components/common/Header.vue';
	import MobileLayout from './components/layouts/MobileLayout.vue';
	import { addGlobalScrollEvent } from './compositions/useScroll';

	export default defineComponent({
		components: { MobileLayout, Header, Footer },
		setup() {
			onMounted(() => {
				addGlobalScrollEvent();
			});
			return {};
		},
	});
</script>

<style>
	@import url('@/assets/css/reset.css');
	@import url('@/assets/css/common.css');
	@import url('@/assets/css/transition.css');
	@import url('@/assets/css/modal.scss');
</style>
