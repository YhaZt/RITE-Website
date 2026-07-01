<template>
  <main class="not-found-page">
    <div class="not-found-container">
      <div class="glow-bg"></div>
      <div class="not-found-content">
        <span class="error-code">404</span>
        <h1 class="error-title">Page Not Found</h1>
        <p class="error-desc">
          The page you are looking for does not exist, has been moved, or requires specific permission to access.
        </p>
        <div class="action-buttons">
          <router-link to="/" class="btn btn-primary">
            Return to Homepage →
          </router-link>
          <router-link to="/contact" class="btn btn-secondary">
            Contact Support
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.not-found-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #e6f7ed 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.not-found-container {
  position: relative;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.glow-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 320px;
  background: rgba(16, 185, 129, 0.15);
  filter: blur(80px);
  border-radius: 50%;
  z-index: 1;
}

.not-found-content {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  padding: 3.5rem 2.5rem;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 20px 40px -15px rgba(9, 74, 37, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-code {
  font-family: 'Outfit', sans-serif;
  font-size: 6rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, #094A25 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.error-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #053018;
  margin: 0 0 1rem 0;
}

.error-desc {
  font-size: 1rem;
  color: #475569;
  line-height: 1.7;
  margin: 0 0 2rem 0;
  max-width: 460px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  font-family: 'Outfit', sans-serif;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #094A25;
  color: white;
  box-shadow: 0 4px 14px rgba(9, 74, 37, 0.2);
}

.btn-primary:hover {
  background: #063018;
  transform: translateY(-2px);
}

.btn-secondary {
  background: white;
  color: #094A25;
  border: 2px solid rgba(9, 74, 37, 0.2);
}

.btn-secondary:hover {
  background: rgba(9, 74, 37, 0.05);
  transform: translateY(-2px);
}
</style>
