<template>
	<mobile-layout>
		<router-view />
	</mobile-layout>
</template>
<script lang="ts">
	import { defineComponent } from 'vue';
	import MobileLayout from './components/layouts/MobileLayout.vue';

	export default defineComponent({
		components: { MobileLayout },
		setup() {
			return {};
		},
	});
</script>

<style></style>
