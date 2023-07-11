<template>
	<BaseBS height="80vh" :isFullWidth="true" @close-modal="$emit('close-modal')">
		<template #content>
			<div class="address-search-container">
				<div id="address_container"></div>
			</div>
		</template>
	</BaseBS>
</template>
<script lang="ts">
	// vue 내장 라이브러리
	import { defineComponent, onMounted, ref } from 'vue';
	import BaseBS from './BaseBS.vue';

	export default defineComponent({
		components: { BaseBS },
		emits: ['send-address', 'close-modal'],
		setup(props, { emit }) {
			onMounted(() => {
				const addressEl = document.querySelector('#address_container') as HTMLDivElement;
				if (addressEl.childElementCount > 0) {
					addressEl.firstChild!.remove();
				}

				let currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
				if (window.daum?.Postcode) {
					new window.daum.Postcode({
						oncomplete: (data: any) => {
							// 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
							// 각 주소의 노출 규칙에 따라 주소를 조합한다.
							// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
							let addr = ''; // 주소 변수
							let extraAddr = ''; // 참고항목 변수
							let ZIP_CD = data.zonecode; // 우편번호
							//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
							if (data.userSelectedType === 'R') {
								// 사용자가 도로명 주소를 선택했을 경우
								addr = data.roadAddress;
							} else {
								// 사용자가 지번 주소를 선택했을 경우(J)
								addr = data.jibunAddress;
							}
							// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
							if (data.userSelectedType === 'R') {
								// 법정동명이 있을 경우 추가한다. (법정리는 제외)
								// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
								if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
									extraAddr += data.bname;
								}
								// 건물명이 있고, 공동주택일 경우 추가한다.
								if (data.buildingName !== '' && data.apartment === 'Y') {
									extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
								}
								// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
								if (extraAddr !== '') {
									extraAddr = ' (' + extraAddr + ')';
								}
							}
							// SearchAddress에 주소 정보 전달
							emit('send-address', { addr, ZIP_CD });
							// iframe을 넣은 element를 안보이게 한다.
							// (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
							//addressEl.style.display = 'none';
							// 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
							document.body.scrollTop = currentScroll;
						},
						// 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
						onresize: () => {
							//addressEl.style.height = size.height + 'px';
							addressEl.style.height = '100%';
						},
						width: '100%',
						height: '100%',
					}).embed(addressEl);
				} else {
					// 주소검색 API 불러오기 오류
				}
			});
		},
	});
</script>

<style lang="scss" scoped>
	.address-search-container {
		height: 80vh;
	}
</style>
