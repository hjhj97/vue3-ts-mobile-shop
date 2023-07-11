export const modalOpenScrollFix = () => {
	const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
	document.body.style.position = 'fixed';
	document.body.style.top = `-${scrollY}`;
	document.body.style.right = '0';
	document.body.style.left = '0';
};
export const modalCloseScrollRestore = () => {
	const scrollY = document.body.style.top;
	document.body.style.position = '';
	document.body.style.top = '';
	document.body.style.left = '';
	document.body.style.right = '';
	const yPos = parseInt(scrollY || '0') * -1;
	if (yPos > 0) {
		window.scrollTo(0, yPos);
	}
};

export const addGlobalScrollEvent = () => {
	window.addEventListener('scroll', () => {
		document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
	});
};
