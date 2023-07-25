<template>
	<div class="popup">
		<p class="popup-content">{{ popup.content }}</p>
		<div class="btn-wrapper">
			<Button theme="primary" @click="onAccept">{{ popup.acceptText || '확인' }}</Button>
			<Button theme="secondary" v-if="popup.rejectText" @click="onReject">{{
				popup.rejectText
			}}</Button>
		</div>
	</div>
</template>

<script lang="ts">
	import Button from '../control/Button.vue';
	import { useModalStore } from '@/stores/modal';
	import { defineComponent } from 'vue';

	export default defineComponent({
		components: { Button },
		setup() {
			const modalStore = useModalStore();
			const { popup } = modalStore;

			const onAccept = () => {
				if (popup.acceptCb) {
					popup.acceptCb();
				} else {
					modalStore.closePopup();
				}
			};
			const onReject = () => {
				if (popup.rejectCb) {
					popup.rejectCb();
				} else {
					modalStore.closePopup();
				}
			};

			return {
				popup,
				onAccept,
				onReject,
			};
		},
	});
</script>

<style>
	@import url('@/assets/css/modal.scss');
</style>
