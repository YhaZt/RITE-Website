<template>
  <main class="page auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h2 class="auth-title">Login</h2>
        <p class="auth-subtitle">Sign in to your RITE account to continue</p>

        <div v-if="errors && errors.length" class="error-alert">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              v-model="form.email"
              required
              class="form-input"
              placeholder="e.g. user@example.com"
              autocomplete="username"
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="password-field">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                required
                class="form-input"
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="eye-btn"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="form.remember" />
              <span>Remember me</span>
            </label>
          </div>

          <button type="submit" :disabled="submitting" class="submit-btn">
            <span v-if="submitting">Signing in…</span>
            <span v-else>Login</span>
          </button>
        </form>

        <div class="auth-links">
          <router-link to="/forgot-password" class="auth-link">Forgot password?</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const REMEMBER_KEY = "rite_remember_login";

const router = useRouter();
const { login, errors } = useAuth();

const showPassword = ref(false);
const form = ref({
  email: "",
  password: "",
  remember: false,
});
const submitting = ref(false);

onMounted(() => {
  try {
    const saved = localStorage.getItem(REMEMBER_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.email) {
        form.value.email = parsed.email;
        form.value.remember = true;
      }
    }
  } catch {
    // ignore bad localStorage
  }
});

const handleSubmit = async () => {
  submitting.value = true;
  try {
    const remember = !!form.value.remember;
    await login({
      email: form.value.email,
      password: form.value.password,
      remember,
    });

    if (remember) {
      localStorage.setItem(
        REMEMBER_KEY,
        JSON.stringify({ email: form.value.email })
      );
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    router.push("/admin");
  } catch (err) {
    console.error("Login failed:", err);
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 2.5rem 1.25rem;
  background: linear-gradient(135deg, #f4f7f5 0%, #e8efe9 100%);
}

.auth-container {
  width: 100%;
  max-width: 480px;
}

.auth-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid rgba(9, 74, 37, 0.08);
  box-shadow: 0 10px 30px rgba(9, 74, 37, 0.04), 0 1px 8px rgba(0, 0, 0, 0.02);
}

.auth-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #094A25;
  margin-bottom: 0.35rem;
  text-align: center;
}

.auth-subtitle {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
}

.error-alert {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.error-alert ul {
  margin: 0;
  padding-left: 1.2rem;
  color: #c53030;
  font-size: 0.9rem;
}

.error-alert li { margin-bottom: 0.25rem; }
.error-alert li:last-child { margin-bottom: 0; }

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  outline: none;
  font-size: 0.95rem;
  color: #1a202c;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #094A25;
  box-shadow: 0 0 0 3px rgba(9, 74, 37, 0.15);
}

.password-field {
  position: relative;
}

.password-field .form-input {
  padding-right: 2.75rem;
}

.eye-btn {
  position: absolute;
  right: 0.65rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye-btn:hover { color: #094A25; }

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #4a5568;
  cursor: pointer;
  user-select: none;
}

.remember-me input {
  width: 1rem;
  height: 1rem;
  accent-color: #094A25;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 0.85rem;
  border-radius: 999px;
  border: none;
  background: #094A25;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(9, 74, 37, 0.2);
}

.submit-btn:hover { background: #07381b; }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.auth-links {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.auth-link {
  color: #094A25;
  text-decoration: none;
  font-weight: 600;
}

.auth-link:hover {
  color: #16a34a;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card { padding: 1.5rem; }
}
</style>
