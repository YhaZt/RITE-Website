<template>
  <main class="page auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h2 class="auth-title">Login</h2>
        <p class="auth-subtitle">Sign in to your RITE account to continue</p>

        <!-- Errors Alert -->
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
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              v-model="form.password"
              required
              class="form-input"
              placeholder="••••••••"
            />
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
          <router-link to="/register" class="auth-link">Create account</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { login, errors } = useAuth();

const form = ref({
  email: "",
  password: "",
  remember: false,
});
const submitting = ref(false);

const handleSubmit = async () => {
  submitting.value = true;
  try {
    await login(form.value);
    router.push("/");
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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

.error-alert li {
  margin-bottom: 0.25rem;
}

.error-alert li:last-child {
  margin-bottom: 0;
}

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
}

.form-input:focus {
  border-color: #094A25;
  box-shadow: 0 0 0 3px rgba(9, 74, 37, 0.15);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
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
  transition: background 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 4px 12px rgba(9, 74, 37, 0.2);
}

.submit-btn:hover {
  background: #07381b;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

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
  transition: color 0.2s ease;
}

.auth-link:hover {
  color: #16a34a;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }
}
</style>
