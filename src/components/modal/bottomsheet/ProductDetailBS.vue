<template>
	<div class="bs">
		<div class="bs-wrapper">
			<div @click="$emit('close-modal')">
				<img src="@/assets/image/icon/x.svg" style="float: right" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		emits: ['close-modal'],
		setup() {},
	});
</script>

<style lang="scss" scoped>
	.bs {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 40vh;
		background-color: #fff;
		border-radius: 3% 3% 0 0;

		& .bs-wrapper {
			padding: 1rem;
		}
	}
</style>
