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
      user.value = me;
    } catch {
      // not logged in
    } finally {
      booting.value = false;
    }
  };

  const login = async (payload) => {
    try {
      errors.value = [];
      const me = await authService.login(payload);
      user.value = me;
      return me;
    } catch (err) {
      errors.value = normalizeErrors(err);
      throw err;
    }
  };

  const register = async (payload) => {
    try {
      errors.value = [];
      const me = await authService.register(payload);
      user.value = me;
      return me;
    } catch (err) {
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
    register,
    logout,
  };
}
