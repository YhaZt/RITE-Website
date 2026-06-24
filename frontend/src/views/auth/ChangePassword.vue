<template>
  <main class="page auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h2 class="auth-title">Change Password</h2>

        <!-- Not logged in prompt -->
        <div v-if="!user" class="not-logged-in-container">
          <p class="not-logged-in-text">You need to be logged in to change your password.</p>
          <router-link to="/login" class="submit-btn login-redirect-btn">Go to login</router-link>
        </div>

        <template v-else>
          <p class="auth-subtitle">Update your password to keep your account secure</p>

          <!-- Success Message -->
          <div v-if="done" class="success-alert">
            Password updated successfully.
          </div>

          <!-- Errors Alert -->
          <div v-if="errors && errors.length" class="error-alert">
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </div>

          <form @submit.prevent="handleSubmit" class="auth-form">
            <div class="form-group">
              <label for="current_password" class="form-label">Current Password</label>
              <input
                id="current_password"
                type="password"
                v-model="form.current_password"
                required
                class="form-input"
                placeholder="••••••••"
              />
            </div>

            <div class="form-group">
              <label for="password" class="form-label">New Password</label>
              <input
                id="password"
                type="password"
                v-model="form.password"
                required
                class="form-input"
                placeholder="••••••••"
              />
            </div>

            <div class="form-group">
              <label for="password_confirmation" class="form-label">Confirm New Password</label>
              <input
                id="password_confirmation"
                type="password"
                v-model="form.password_confirmation"
                required
                class="form-input"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" :disabled="submitting" class="submit-btn">
              <span v-if="submitting">Saving…</span>
              <span v-else>Update password</span>
            </button>
          </form>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import * as auth from "@/services/auth";

const { user } = useAuth();

const form = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const submitting = ref(false);
const done = ref(false);
const errors = ref([]);

const handleSubmit = async () => {
  submitting.value = true;
  done.value = false;
  errors.value = [];
  try {
    await auth.changePassword(form.value);
    done.value = true;
    form.value = {
      current_password: "",
      password: "",
      password_confirmation: "",
    };
  } catch (err) {
    const data = err?.response?.data;
    if (data?.errors) {
      errors.value = Object.values(data.errors).flat();
    } else if (data?.message) {
      errors.value = [data.message];
    } else {
      errors.value = ["Unable to change password."];
    }
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
  max-width: 520px;
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

.not-logged-in-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.not-logged-in-text {
  font-size: 1rem;
  color: #4a5568;
  text-align: center;
}

.login-redirect-btn {
  display: inline-block;
  text-align: center;
  text-decoration: none;
}

.success-alert {
  background: #f0fff4;
  border: 1px solid #c6f6d5;
  color: #276749;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
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
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background: #07381b;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }
}
</style>
