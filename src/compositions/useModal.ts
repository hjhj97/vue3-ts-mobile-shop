import { ref } from 'vue';
import { modalCloseScrollRestore, modalOpenScrollFix } from './useScroll';

const useModal = () => {
	const isOpen = ref(false);
	const openModal = () => {
		isOpen.value = true;
		modalOpenScrollFix();
	};
	const closeModal = () => {
		isOpen.value = false;
		modalCloseScrollRestore();
	};
	return { openModal, closeModal, isOpen };
};

export default useModal;
