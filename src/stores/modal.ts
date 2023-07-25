import { defineStore } from 'pinia';

export type PopupType = {
	content: string;
	acceptText?: string;
	rejectText?: string;
	acceptCb?: () => any;
	rejectCb?: () => any;
};

export const useModalStore = defineStore('modal', {
	state: () => {
		return {
			isGlobalModalOpen: false,

			popup: {
				content: '',
				acceptText: '',
				rejectText: '',
				acceptCb: Function,
				rejectCb: Function,
			} as PopupType,
		};
	},
	actions: {
		openPopup(popup: PopupType) {
			this.popup = popup;
			this.isGlobalModalOpen = true;
		},
		closePopup() {
			this.isGlobalModalOpen = false;
		},
	},
});
