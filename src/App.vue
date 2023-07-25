<template>
	<mobile-layout>
		<Header />
		<router-view />
		<Footer />

		<teleport-modal v-if="modalStore.isGlobalModalOpen" transMode="none">
			<GlobalPopup />
		</teleport-modal>
	</mobile-layout>
</template>
<script lang="ts">
	// 컴포넌트
	import Footer from './components/common/Footer.vue';
	import Header from './components/common/Header.vue';
	import MobileLayout from './components/layouts/MobileLayout.vue';
	import GlobalPopup from './components/modal/GlobalPopup.vue';
	import TeleportModal from './components/modal/TeleportModal.vue';
	// vue 라이브러리
	import { defineComponent, onMounted } from 'vue';
	import { useModalStore } from './stores/modal';
	// composition
	import { addGlobalScrollEvent } from './compositions/useScroll';

	export default defineComponent({
		components: { MobileLayout, Header, Footer, TeleportModal, GlobalPopup },
		setup() {
			const modalStore = useModalStore();
			onMounted(() => {
				addGlobalScrollEvent();
			});
			return {
				modalStore,
			};
		},
	});
</script>

<style>
	@import url('@/assets/css/reset.css');
	@import url('@/assets/css/common.css');
	@import url('@/assets/css/transition.css');
	@import url('@/assets/css/modal.scss');
</style>
