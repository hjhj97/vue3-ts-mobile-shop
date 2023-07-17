<template>
	<button v-bind="$attrs" :class="theme">
		<slot />
	</button>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		props: {
			theme: String,
		},
		setup() {
			return {};
		},
	});
</script>

<style lang="scss" scoped>
	button {
		border: none;
		width: 100%;
		padding: 1rem;
		border-radius: var(--space-x-small);
		font-size: var(--font-size-xx-small);
		font-weight: 600;

		&:disabled {
			opacity: 0.3;
		}

		&.primary {
			background-color: var(--color-primary);
			color: #fff;
		}
		&.secondary {
			background-color: #ddd;
		}
		&.reverse {
			background-color: #fff;
			color: var(--color-primary);
			border: 1px solid var(--color-primary);
		}
	}
</style>
