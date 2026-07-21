import { ref, readonly } from "vue";
import * as authService from "@/services/auth";

const user = ref(null);
const booting = ref(true);
const errors = ref([]);

const normalizeErrors = (err) => {
  const data = err?.response?.data;
  if (data?.errors && typeof data.errors === "object") {
    return Object.values(data.errors).flat().filter(Boolean);
  }
  if (data?.message) return [data.message];
  return ["Something went wrong."];
};

export function useAuth() {
  const init = async () => {
    try {
      errors.value = [];
      const me = await authService.getUser();
      // Require a real user payload; never treat empty/401 as logged in
      user.value = me?.id ? me : null;
    } catch {
      user.value = null;
    } finally {
      booting.value = false;
    }
  };

  const login = async (payload) => {
    try {
      errors.value = [];
      const me = await authService.login(payload);
      user.value = me?.id ? me : null;
      if (!user.value) {
        throw new Error("Login succeeded but no user was returned.");
      }
      return me;
    } catch (err) {
      user.value = null;
      errors.value = normalizeErrors(err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      errors.value = [];
      await authService.logout();
    } finally {
      user.value = null;
    }
  };

  return {
    user,
    booting: readonly(booting),
    errors: readonly(errors),
    init,
    login,
    logout,
  };
}
