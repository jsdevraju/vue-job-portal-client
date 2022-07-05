import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import axios from "axios";
import store from "./store/store";

const app = createApp(App);

app.use(router);
app.use(VueToast);
app.use(store)

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const res = error.response;
    //Checking token is expire or not if token expire return automatic logout and return login page
    if (res?.data?.message?.includes("invalid token")) {
      return new Promise((response, reject) => {
        axios
          .get(`${import.meta.env.VITE_APP_BASE_URL}/auth/logout`)
          .then(() => {
            localStorage.clear();
            router.push("/login")
          })
          .catch((err) => {
            console.log(err);
            reject(error);
          });
      });
    }
    return Promise.reject(error);
  }
);

app.mount("#app");
