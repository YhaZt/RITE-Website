import { createApp } from "vue";
import "@/index.css";
import App from "@/App.vue";
import router from "@/router";
import { useAuth } from "@/composables/useAuth";

const app = createApp(App);
app.use(router);

const { init } = useAuth();

// Fetch user status and then mount to prevent flash of unauthenticated state
init().finally(() => {
  app.mount("#app");
});
