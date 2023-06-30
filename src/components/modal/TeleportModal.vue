<template>
	<teleport to="#modal">
		<div class="modal">
			<Transition :name="transMode" appear>
				<slot />
			</Transition>
		</div>
	</teleport>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		props: {
			transMode: {
				type: String,
				default: 'slide-up',
			},
		},
		setup() {},
	});
</script>
<style>
	.modal {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
