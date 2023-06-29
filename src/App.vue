<template>
	<mobile-layout>
		<Header />
		<router-view />
	</mobile-layout>
</template>
<script lang="ts">
	import { defineComponent } from 'vue';
	import Header from './components/common/Header.vue';
	import MobileLayout from './components/layouts/MobileLayout.vue';

	export default defineComponent({
		components: { MobileLayout, Header },
		setup() {
			return {};
		},
	});
</script>

<style>
	@import url('@/assets/css/reset.css');
	@import url('@/assets/css/common.css');
</style>
