<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">

        <div class="text-center mb-4">
          <h2>Welcome Back</h2>
          <p class="text-muted">Login to your CarHub account</p>
        </div>

        <form @submit.prevent="handleLogin">

          <!-- Email -->
          <div class="mb-3">
            <label class="form-label">Email</label>

            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label class="form-label">Password</label>

            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="alert alert-danger"
          >
            {{ errorMessage }}
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="loading"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>

        </form>

        <!-- Register -->
        <div class="text-center mt-4">
          <p>
            Don't have an account?

            <RouterLink to="/register">
              Register
            </RouterLink>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import axios from 'axios'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')


async function handleLogin() {

  errorMessage.value = ''
  loading.value = true

  try {

    // Get all users from JSON Server
    const response = await axios.get(
      'http://localhost:3000/users'
    )

    console.log('All users:', response.data)

    // Find user using email and password
    const user = response.data.find(
      item =>
        item.email?.trim().toLowerCase() ===
          email.value.trim().toLowerCase() &&
        item.password === password.value
    )

    console.log('Found user:', user)

    // User not found
    if (!user) {

      errorMessage.value =
        'Invalid email or password.'

      return
    }

    // Save logged-in user
    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    )

    localStorage.setItem(
      'isLoggedIn',
      'true'
    )

    // Success message
    await Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: `Welcome ${user.name}!`,
      timer: 1500,
      showConfirmButton: false
    })

    // Redirect according to role
    if (user.role === 'seller') {

      router.push('/seller-dashboard')

    } else {

      router.push('/dashboard')

    }

  } catch (error) {

    console.error('Login error:', error)

    errorMessage.value =
      'Unable to connect to the API. Make sure JSON Server is running on port 3000.'

  } finally {

    loading.value = false

  }
}
</script>
<style scoped>
.login-page {
  min-height: 100vh;
  background:
    linear-gradient(
      45deg,
      #102A27,
      #1F6F5B,
      #70C1B3,
      #B2DBBF,
      #F7FFF7
    );}

.login-header {
  padding: 16px 0;
  background: #ffffff;
  border-bottom: 1px solid #e5eee9;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #102a27;
  font-size: 24px;
  font-weight: 700;
}

.logo-icon {
  font-size: 24px;
}

.menu-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #102a27;
  font-size: 28px;
  cursor: pointer;
}

.menu-btn:hover {
  background: #b2dbbf;
}

.login-content {
  padding: 64px 0;
}

.login-card {
  max-width: 480px;
  margin: 0 auto;
  padding: 32px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(16, 42, 39, 0.08);
}

.login-title {
  margin-bottom: 32px;
}

.login-title h1 {
  margin-bottom: 8px;
  color: #102a27;
  font-size: 48px;
  font-weight: 700;
}

.login-title p {
  margin: 0;
  color: #666666;
  font-size: 16px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #102a27;
  font-size: 16px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border: 1px solid #d9e5df;
  border-radius: 10px;
  background: #ffffff;
  color: #102a27;
  font-family: inherit;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #1f6f5b;
  box-shadow: 0 0 0 3px rgba(31, 111, 91, 0.1);
}

.signin-btn {
  width: 100%;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background: #1f6f5b;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.signin-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-text {
  margin: 24px 0 16px;
  text-align: center;
  color: #666666;
  font-size: 14px;
}

.register-text a {
  color: #1f6f5b;
  text-decoration: none;
  font-weight: 600;
}

.demo-box,
.message-box {
  margin-top: 16px;
  padding: 16px;
  border-radius: 10px;
  background: #f1f3f3;
  color: #666666;
  font-size: 14px;
  line-height: 1.6;
}

.demo-box strong {
  color: #102a27;
}

.message-box {
  color: #1f6f5b;
}

.message-box.error {
  color: #b42318;
  background: #fff1f0;
}

@media (max-width: 576px) {
  .login-content {
    padding: 40px 0;
  }

  .login-card {
    padding: 24px;
  }

  .login-title h1 {
    font-size: 36px;
  }
}
</style>
