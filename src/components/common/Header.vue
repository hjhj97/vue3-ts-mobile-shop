<template>
	<header>
		<div class="header-item-left">
			<div>
				<img src="@/assets/image/icon/menu.svg" />
			</div>
		</div>
		<div class="header-item-mid">
			<h1>Shop</h1>
		</div>
		<div class="header-item-right">
			<div>
				<img src="@/assets/image/icon/search.svg" />
			</div>
			<div>
				<img src="@/assets/image/icon/shopping-cart.svg" />
			</div>
		</div>
	</header>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		setup() {
			return {};
		},
	});
</script>

<style lang="scss" scoped>
	header {
		position: sticky;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: var(--header-height);
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
		left: 0;
		right: 0;
		top: 0;
		z-index: 99;
		padding: 0 var(--space-x-small);
		background-color: #fff;

		& .header-item-left {
			display: flex;
		}
		& .header-item-mid {
			position: relative;
			left: 15px;
			& h1 {
				font-size: var(--font-size-small);
				font-weight: bold;
			}
		}
		& .header-item-right {
			display: flex;
			gap: var(--space-xx-small);
		}
	}
</style>
