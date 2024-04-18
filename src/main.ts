import { createApp } from "vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-purple/theme.css";
import "./styles.css";
import App from "./App.vue";

createApp(App).mount("#app");
App.use(PrimeVue);
