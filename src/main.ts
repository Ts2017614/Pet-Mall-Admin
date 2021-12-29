import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import installElementPlus from "./plugins/element";
import registerProperties from "@/global/register-properties"; //处理时间格式
import { createPinia } from "pinia";
import { useStore } from "@/store/index"; //每次刷新，vuex刷新，拉取本地缓存
import "./assets/css/icon.css";
const app = createApp(App);
installElementPlus(app);
registerProperties(app);
app.use(createPinia()).use(router).mount("#app");
useStore().RefreshVuex(); //每次刷新，vuex刷新，拉取本地缓存
