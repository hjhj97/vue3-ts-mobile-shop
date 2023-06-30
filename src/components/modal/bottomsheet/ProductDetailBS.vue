<template>
	<div class="bs">
		<div class="bs-wrapper">
			<div @click="$emit('close-modal')" class="bs-top-btn">
				<img src="@/assets/image/icon/x.svg" />
			</div>
			<div class="bs-content">
				<ul class="option-list">
					<li class="option-item" v-for="i in 3" :key="i">옵션 {{ i }}</li>
				</ul>
			</div>

			<div class="bs-bottom">
				<Button theme="primary" @click="onRequestOrder">구입</Button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Button from '@/components/control/Button.vue';
	import router from '@/router';
	import { defineComponent } from 'vue';

	export default defineComponent({
		components: { Button },
		emits: ['close-modal'],
		setup() {
			const onRequestOrder = () => {
				// 비동기통신
				router.push({ name: 'Order', params: { order_id: 1 } });
			};
			return {
				onRequestOrder,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.bs {
		position: absolute;
		bottom: 0;
		height: auto;
		width: 100%;
		background-color: #fff;
		border-radius: 3% 3% 0 0;

		& .bs-wrapper {
			height: 50vh;
			padding: 1rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			& .bs-top-btn {
				display: flex;
				justify-content: flex-end;
			}

			& .bs-content {
				& .option-list {
					display: flex;
					flex-direction: column;
					gap: 0.4rem;

					& .option-item {
						padding: 0.7rem 0.5rem;
						border-radius: 0.2rem;
						background: #f2f2f2;
					}
				}
			}

			& .bs-bottom {
				width: 100%;
				position: fixed;
				display: flex;
				justify-content: center;
				align-items: center;
				bottom: 0;
				left: 0;
				right: 0;
				padding: 1rem;
				box-sizing: border-box;
			}
		}
	}
</style>
