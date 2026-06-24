import { http, csrf } from "@/api/http";

export async function getUser() {
  const res = await http.get("/api/user");
  return res.data;
}

export async function login({ email, password, remember }) {
  await csrf();
  await http.post("/login", { email, password, remember });
  return getUser();
}

export async function register({ name, email, password, password_confirmation }) {
  await csrf();
  await http.post("/register", { name, email, password, password_confirmation });
  return getUser();
}

export async function logout() {
  await csrf();
  await http.post("/logout");
}

export async function forgotPassword({ email }) {
  await csrf();
  await http.post("/forgot-password", { email });
}

export async function resetPassword({ email, token, password, password_confirmation }) {
  await csrf();
  await http.post("/reset-password", { email, token, password, password_confirmation });
}

export async function changePassword({ current_password, password, password_confirmation }) {
  await csrf();
  await http.post("/api/user/password", { current_password, password, password_confirmation });
}

export function isValidationError(error) {
  return Boolean(error?.response?.status === 422 && error?.response?.data?.errors);
}

export function validationErrors(error) {
  return error?.response?.data?.errors || {};
}
