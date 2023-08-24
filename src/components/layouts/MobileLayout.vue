<template>
	<div class="mobile-layout">
		<slot />
	</div>
</template>

<script lang="ts"></script>

<style scoped>
	.mobile-layout {
		margin: 0 auto;
		max-width: 500px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
	}
</style>
