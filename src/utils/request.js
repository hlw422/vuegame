import axios from "axios";
import Cofig, { title } from "@/settings";
import { getToken } from "./auth";
import { tr } from "element-plus/es/locale";
import { Notification } from "element-plus";
import store from "@/store";
import router from "@/router";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_API_URL
      : "/api",
  timeout: Config.timeout,
});

service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (getToken()) {
      config.headers["Authorization"] = `Bearer ${getToken()}`; // Set JWT token in header
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

sevice.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    if (
      error.response.data instanceof Blob &&
      error.response.data.type.toLowerCase().includes("json") !== -1
    ) {
      const reader = new FileReader();
      reader.readAsText(error.response.data, "utf-8");
      reader.onload = () => {
        const errorData = JSON.parse(reader.result).message;
        Notification.error({
          title: "Error",
          message: errorData,
          duration: 5000,
        });
      };
    } else {
      let code = 0;
      try {
        code = error.response.data.code;
      } catch (error) {
        if (error.toString().includes("Error: timeout") !== -1) {
          Notification.error({
            title: "Error",
            message: tr("request.timeout"),
            duration: 5000,
          });
          return Promise.reject(error);
        }
      }
      if (code === 401) {
        store.dispatch("user/logout").then(() => {
          Cookies.set("point", 401);
          location.reload();
        });
        Notification.error({
          title: "Error",
          message: tr("request.unauthorized"),
          duration: 5000,
        });
        store.dispatch("user/logout");
        router.push("/login");
      } else if (code === 403) {
        Notification.error({
          title: "Error",
          message: tr("request.forbidden"),
          duration: 5000,
        });
      } else if (code === 404) {
        Notification.error({
          title: "Error",
          message: tr("request.notFound"),
          duration: 5000,
        });
      } else if (code === 500) {
        Notification.error({
          title: "Error",
          message: tr("request.serverError"),
          duration: 5000,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default service; // Don't forget to export the service
