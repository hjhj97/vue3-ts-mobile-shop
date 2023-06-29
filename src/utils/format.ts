export const priceFormat = (num: number | string) => {
	if (typeof num === 'number') {
		return new Intl.NumberFormat().format(num);
	} else if (typeof num === 'string') {
		return num;
	} else {
		return '-';
	}
};
