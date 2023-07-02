<template>
	<div class="order-delivery">
		<h2>주문자 정보</h2>
		<div class="order-input-wrapper name">
			<label for="order-name">이름</label>
			<input type="text" id="order-name" />
		</div>
		<div class="order-input-wrapper contact">
			<label for="order-contact">연락처</label>
			<input type="tel" id="order-contact" />
		</div>
		<div class="order-input-wrapper email">
			<label for="order-email">이메일</label>
			<input type="email" id="order-email" />
		</div>
		<div class="order-input-wrapper zipcd">
			<label for="order-zipcd">우편번호</label>
			<input type="text" id="order-zipcd" disabled />
			<Button theme="primary">검색</Button>
		</div>
		<div class="order-input-wrapper address">
			<label for="order-address">주소</label>
			<input type="text" id="order-address" placeholder="우편번호 선택시 자동입력" disabled />
		</div>
		<div class="order-input-wrapper address_detail">
			<label for="order-address_detail">상세주소</label>
			<input type="text" id="order-address_detail" />
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import Button from '../control/Button.vue';

	export default defineComponent({
		components: { Button },
		setup() {
			return {};
		},
	});
</script>

<style lang="scss" scoped>
	.order-delivery {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem;

		& h2 {
			font-size: var(--font-size-x-small);
			font-weight: bold;
			margin-top: 1rem;
		}

		& .order-input-wrapper {
			width: 100%;
			height: 2.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;

			& label {
				min-width: 25%;
			}

			& input {
				width: 75%;
				height: 100%;
				border: 1.2px solid #ddd;
				border-radius: 7px;
				padding-left: 0.8rem;
			}

			&.zipcd {
				input {
					width: 40%;
				}
				& button {
					width: 30%;
				}
			}
		}
	}
</style>
