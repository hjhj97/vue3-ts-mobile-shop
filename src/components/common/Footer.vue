<template>
	<footer v-show="isFooterShow">
		<div>
			<p>
				Developed By
				<a href="https://github.com/hjhj97"> Neon </a>
			</p>
		</div>
	</footer>
</template>

<script lang="ts">
	import { computed, defineComponent, ref, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import router from '@/router';

	export default defineComponent({
		setup() {
			const route = useRoute();
			const isFooterShow = ref(true);

			watch(route, async () => {
				await router.isReady();
				const noFooter = document.querySelector('.no-footer');
				if (noFooter) {
					isFooterShow.value = false;
					const bottomFixedEl = document.querySelector('.bottom-fixed');
					if (bottomFixedEl) {
						bottomFixedEl.setAttribute('style', 'padding-bottom:5rem');
					}
				} else {
					isFooterShow.value = true;
				}
			});

			return { isFooterShow };
		},
	});
</script>

<style scoped>
	footer {
		height: var(--footer-height);
		padding: var(--space-small) var(--space-x-small);
		font-size: var(--font-size-xx-small);
		color: #999;
		background-color: #f2f2f2;
	}
</style>
