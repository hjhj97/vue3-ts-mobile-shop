<template>
	<div class="main-banner">
		<Swiper :slides-per-view="1" :pagination="true" :autoplay="{ delay: 5000 }" :modules="modules">
			<SwiperSlide>
				<div class="image-wrapper">
					<img
						src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mba15-midnight-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684518479433"
					/>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div class="image-wrapper">
					<img
						src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-comp-pro-202210?wid=338&hei=386&fmt=jpeg&qlt=90&.v=1664411153112"
					/>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div class="image-wrapper">
					<img
						src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-compare-iphone-14-pro-202209?wid=366&hei=508&fmt=jpeg&qlt=90&.v=1661471046256"
					/>
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
