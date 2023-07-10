<template>
	<div class="option-list__bottom">
		<div class="amount-button">
			<button @click="handleAmount(-1)">-</button>
			<input type="number" :value="amount" @change="handleAmount" />
			<button @click="handleAmount(+1)">+</button>
		</div>
		<span>{{ $priceFormat(totalPrice) }}원</span>
	</div>
</template>

<script lang="ts">
	import { ProductOption } from '@/types/product';
	import { computed, defineComponent, ref, PropType } from 'vue';

	const MIN_AMOUNT = 0;
	const MAX_AMOUNT = 100;

	export default defineComponent({
		props: {
			option: {
				type: Object as PropType<ProductOption>,
				required: true,
			},
		},
		emits: ['change-amount'],
		setup(props, { emit }) {
			const amount = ref<number>(0);
			const totalPrice = computed(() => {
				return props.option.optionPrice * amount.value;
			});

			const handleAmount = (diff: number | Event) => {
				let newAmount: number;
				if (typeof diff === 'number') {
					newAmount = amount.value + diff;
				} else {
					newAmount = parseInt((diff.target as HTMLInputElement).value);
				}

				if (newAmount >= MIN_AMOUNT && newAmount < MAX_AMOUNT) {
					amount.value = newAmount;
					emit('change-amount', { optionId: props.option.optionId, amount: amount.value });
				} else {
					alert('0개 이상 99개 이하만 선택할 수 있습니다.');
				}
			};
			return {
				totalPrice,
				amount,
				handleAmount,
			};
		},
	});
</script>

<style lang="scss" scoped>
	.option-list__bottom {
		display: flex;
		justify-content: space-between;

		.amount-button {
			display: flex;
			gap: var(--space-xx-small);
			/*border: 1px solid black;*/

			input {
				width: 15px;
				text-align: center;
				border: none;
			}

			button {
				width: 25px;
				height: 25px;
				border: none;
				border-radius: 50%;
			}
		}
	}
</style>