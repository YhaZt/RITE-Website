import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

const apiRoot = baseURL.endsWith("/api") ? baseURL.slice(0, -4) : baseURL;
const apiBase = baseURL.endsWith("/api") ? baseURL : `${baseURL}/api`;

const shared = {
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};

export const http = axios.create({
  ...shared,
  baseURL: apiBase,
  headers: {
    ...shared.headers,
    "Content-Type": "application/json",
  },
});

/** Hit Sanctum so Laravel sets XSRF-TOKEN + session cookies (Domain must be shared). */
export async function csrf() {
  await axios.get(`${apiRoot}/sanctum/csrf-cookie`, {
    ...shared,
  });
}
