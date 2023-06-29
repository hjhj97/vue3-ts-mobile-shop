import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';

import { priceFormat } from './utils/format';

const app = createApp(App);

app.config.globalProperties.$priceFormat = priceFormat;

app.use(pinia).use(router).mount('#app');
