import axios from '@/plugins/axiosSetup';

export const getProducts = async () => {
	const res = await axios.get('/');
	return res.data;
};
