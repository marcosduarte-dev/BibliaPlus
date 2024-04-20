import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import "primevue/resources/themes/aura-dark-purple/theme.css";
import "./styles.css";
import App from "./App.vue";
import Toast from "primevue/toast";

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.component("Toast", Toast);
app.mount("#app");
