<template>
  <div class="login-page">
    <Navbar />

    <main class="login-content">
      <div class="container">

        <div class="login-card">

          <div class="text-center login-title">
            <h1>Login</h1>

            <p>
              Welcome back — your garage is waiting.
            </p>
          </div>

          <form @submit.prevent="login">

            <div class="form-group">
              <label for="email">
                Email
              </label>

              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="password">
                Password
              </label>

              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              class="signin-btn"
              :disabled="loading"
            >
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>

          </form>

          <p class="register-text">
            No account yet?
            <RouterLink to="/register">
              Create one
            </RouterLink>
          </p>

          <div
            v-if="message"
            class="message-box"
            :class="{ error: error }"
          >
            {{ message }}
          </div>

          <div class="demo-box">
            <strong>Demo:</strong>
            Use a DummyJSON test user account to test the API login.
          </div>

        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const message = ref('')
const error = ref(false)

const login = async () => {
  loading.value = true
  message.value = ''
  error.value = false

  try {
    const usersResponse = await fetch(
      `https://dummyjson.com/users/search?q=${encodeURIComponent(email.value)}`
    )

    const usersData = await usersResponse.json()

    const user = usersData.users.find(
      item => item.email.toLowerCase() === email.value.toLowerCase()
    )

    if (!user) {
      throw new Error('User not found')
    }

    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        password: password.value,
        expiresInMins: 30
      }),
      credentials: 'include'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Invalid email or password')
    }

    localStorage.setItem('carhub_token', data.accessToken)
    localStorage.setItem('carhub_user', JSON.stringify(data))

    message.value = `Welcome back, ${data.firstName}!`

    console.log('Login successful:', data)

    setTimeout(() => router.push('/dashboard'), 1000)

  } catch (err) {
    error.value = true
    message.value = err.message
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