<template>
	<div class="bs" ref="bsRef">
		<div class="bs-wrapper">
			<div @click="$emit('close-modal')" class="bs-top-btn">
				<img src="@/assets/image/icon/x.svg" />
			</div>
			<div class="bs-content" ref="bsContentRef">
				<slot name="content" />
			</div>

			<div class="bs-bottom">
				<slot name="bottom" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, onBeforeMount, onMounted, ref } from 'vue';

	export default defineComponent({
		props: {
			height: {
				type: String,
				default: '50vh',
			},
			isFullWidth: {
				type: Boolean,
				default: false,
			},
		},
		emits: ['close-modal'],
		setup(props) {
			const bsRef = ref<HTMLDivElement | null>(null);
			const bsContentRef = ref<HTMLDivElement | null>(null);
			onMounted(() => {
				if (bsRef.value) {
					bsRef.value.style.height = props.height;
				}
				if (bsContentRef.value && props.isFullWidth) {
					bsContentRef.value.style.padding = '0';
				}
			});
			return {
				bsRef,
				bsContentRef,
			};
		},
	});
</script>

<style scoped></style>
