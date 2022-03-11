import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
// import './global/firebase.js';
import * as components from './components/UI/index.js';

const app = createApp(App);

Object.entries(components).forEach(([key, value]) => {
    app.component(key, value);
});
app.use(router);
app.mount('#app');
