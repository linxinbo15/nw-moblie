import { createApp } from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-mobile-vue';
import router from './router';
import { setupStore } from './store';
import '@/style/index.less';

const app = createApp(App);
app.use(TDesign);
app.use(router);
// 安装pinia
setupStore(app);

app.mount('#app');
