<template>
	<footer>
		<div>
			<p>
				Developed By
				<a href="https://github.com/hjhj97"> Neon </a>
			</p>
		</div>
	</footer>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		setup() {
			return {};
		},
	});
</script>

<style scoped>
	footer {
		padding: var(--space-small) var(--space-x-small);
		padding-bottom: 4rem;
		font-size: var(--font-size-xx-small);
		color: #999;
		background-color: #f2f2f2;
	}
</style>
