<template>
	<div class="bottom-fixed">
		<div class="bottom-wrapper">
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		setup() {
			return {};
		},
	};
</script>

<style lang="scss" scoped>
	.bottom-fixed {
		position: fixed;
		max-width: 500px;
		margin: 0 auto;
		background-color: #fff;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

		& .bottom-wrapper {
			display: flex;
			gap: var(--space-xx-small);
			padding: var(--space-xx-small);
		}
	}
</style>
