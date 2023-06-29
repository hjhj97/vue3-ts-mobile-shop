<template>
	<div class="main-banner">
		<Swiper :slides-per-view="1" :pagination="true" :autoplay="{ delay: 5000 }" :modules="modules">
			<SwiperSlide>
				<div class="image-wrapper">
					<img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" />
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div class="image-wrapper">
					<img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" />
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div class="image-wrapper">
					<img src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" />
				</div>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { Pagination, Autoplay } from 'swiper';

	// Import Swiper styles
	import 'swiper/css';
	import 'swiper/css/pagination';

	export default defineComponent({
		components: { Swiper, SwiperSlide },
		setup() {
			return {
				modules: [Pagination, Autoplay],
			};
		},
	});
</script>

<style scoped>
	.main-banner >>> .swiper {
		padding-bottom: var(--space-mid);
	}

	.image-wrapper {
		width: 100%;
		height: 100%;
	}
	.image-wrapper img {
		width: 100%;
		max-height: 300px;
		object-fit: contain;
	}
</style>
