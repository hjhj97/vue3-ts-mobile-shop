<template>
	<div class="order-delivery">
		<h2>주문자 정보</h2>
		<div class="order-input-wrapper name">
			<label for="order-name">이름</label>
			<input type="text" id="order-name" v-model="deliveryInfo.name" />
		</div>
		<div class="order-input-wrapper contact">
			<label for="order-contact">연락처</label>
			<input type="tel" id="order-contact" v-model="deliveryInfo.contact" />
		</div>
		<div class="order-input-wrapper email">
			<label for="order-email">이메일</label>
			<input type="email" id="order-email" v-model="deliveryInfo.email" />
		</div>
		<div class="order-input-wrapper zipcd">
			<label for="order-zipcd">우편번호</label>
			<input type="text" id="order-zipcd" disabled v-model="deliveryInfo.zipcd" />
			<Button theme="primary" @click="openModal">검색</Button>
		</div>
		<div class="order-input-wrapper address">
			<label for="order-address">주소</label>
			<input
				type="text"
				id="order-address"
				placeholder="우편번호 선택시 자동입력"
				disabled
				v-model="deliveryInfo.address"
			/>
		</div>
		<div class="order-input-wrapper address_detail">
			<label for="order-address_detail">상세주소</label>
			<input type="text" id="order-address_detail" v-model="deliveryInfo.addressDetail" />
		</div>

		<TeleportModal v-if="isOpen">
			<AddressBS @close-modal="closeModal" @send-address="onSendAddress" />
		</TeleportModal>
	</div>
</template>

<script lang="ts">
	// 컴포넌트
	import Button from '../control/Button.vue';
	import AddressBS from '../modal/bottomsheet/AddressBS.vue';
	import TeleportModal from '../modal/TeleportModal.vue';
	// vue 라이브러리
	import { defineComponent } from 'vue';
	// composition
	import useModal from '@/compositions/useModal';
	// npm 라이브러리
	import { useField } from 'vee-validate';
	// Type
	import { OrderDelivery } from '@/types/order';

	export default defineComponent({
		components: { Button, AddressBS, TeleportModal },
		setup() {
			const { openModal, closeModal, isOpen } = useModal();
			const { value: deliveryInfo } = useField<OrderDelivery>(
				'deliveryInfo',
				(values) => {
					if (!values.name) {
						return '주문자 이름을 입력해주세요';
					} else if (!values.contact) {
						return '연락처를 입력해주세요';
					} else if (!values.zipcd || !values.address) {
						return '주소를 입력해주세요';
					} else {
						return true;
					}
				},
				{
					initialValue: {
						name: '',
						contact: '',
						email: '',
						zipcd: '',
						address: '',
					},
				},
			);

			const onSendAddress = (data: { addr: string; ZIP_CD: string }) => {
				deliveryInfo.value.address = data.addr;
				deliveryInfo.value.zipcd = data.ZIP_CD;
				closeModal();
			};
			return {
				deliveryInfo,
				isOpen,
				//
				onSendAddress,
				openModal,
				closeModal,
			};
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
