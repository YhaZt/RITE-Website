import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

const apiRoot = baseURL.endsWith("/api") ? baseURL.slice(0, -4) : baseURL;
const apiBase = baseURL.endsWith("/api") ? baseURL : `${baseURL}/api`;

function readCookie(name) {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([$()*+.?[\\\]^{|}])/g, "\\$1")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function syncXsrfHeader() {
  const token = readCookie("XSRF-TOKEN");
  if (token) {
    http.defaults.headers.common["X-XSRF-TOKEN"] = token;
  } else {
    delete http.defaults.headers.common["X-XSRF-TOKEN"];
  }
  return token;
}

export const http = axios.create({
  baseURL: apiBase,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

/** Refresh Sanctum CSRF cookie + sync header for the next mutating request. */
export async function csrf() {
  await axios.get(`${apiRoot}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  syncXsrfHeader();
}

http.interceptors.request.use((config) => {
  syncXsrfHeader();
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const config = error?.config;
    if (status === 419 && config && !config.__csrfRetried) {
      config.__csrfRetried = true;
      try {
        await csrf();
        return http.request(config);
      } catch {
        // fall through to original error
      }
    }
    return Promise.reject(error);
  }
);
