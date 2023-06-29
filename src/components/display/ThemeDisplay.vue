<template>
	<div>
		<ul class="theme-list">
			<li v-for="theme in themes" :key="theme.name" class="theme-item">
				<div class="theme-image-wrapper">
					<img src="@/assets/image/icon/package.svg" />
				</div>
				<p>
					{{ theme.name }}
				</p>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	const themes = [
		{
			name: '오늘의 테마',
		},
		{
			name: '할인가',
		},
		{
			name: '장보기',
		},
		{
			name: '테마',
		},
		{
			name: '이벤트',
		},
	];
	export default defineComponent({
		setup() {
			return { themes };
		},
	});
</script>

<style lang="scss" scoped>
	.theme-list {
		display: flex;
		gap: var(--space-small);
		margin: 0 1rem;

		& .theme-item {
			display: flex;
			flex-direction: column;
			gap: var(--space-xx-small);
			justify-content: center;
			align-items: center;
			width: calc(calc(100% / 5) - 0.8rem);
			height: 80px;

			& .theme-image-wrapper {
				display: flex;
				justify-content: center;
				height: 70%;
				background-color: #eee;
				width: 100%;
				margin: 0 auto;
				border-radius: 20%;

				& img {
					width: 70%;
				}
			}
			& p {
				font-size: var(--font-size-xxx-small);
			}
		}
	}
</style>
