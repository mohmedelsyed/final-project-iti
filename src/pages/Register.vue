<template>
  <div class="register-page">

    <header class="register-header">
      <div class="container">
        <div class="header-content">

          <div class="logo">
            <span class="logo-icon">🚗</span>
            <span>CarHub</span>
          </div>

          <button class="menu-btn" type="button">
            <i class="bi bi-list"></i>
          </button>

        </div>
      </div>
    </header>

    <main class="register-content">
      <div class="container">

        <div class="register-card">

          <div class="text-center register-title">
            <h1>Create your account</h1>

            <p>
              Save cars, compare specs and get better matches.
            </p>
          </div>

          <form @submit.prevent="register">

            <div class="form-group">
              <label for="name">
                Full name
              </label>

              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="Mohamed Elsayed"
                required
              />
            </div>

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
              <label for="phone">
                Phone
              </label>

              <input
                id="phone"
                v-model="phone"
                type="tel"
                placeholder="+20 100 000 0000"
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
                placeholder="Create a password"
                required
              />
            </div>

            <div class="form-group">
              <label for="confirm-password">
                Confirm password
              </label>

              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              class="register-btn"
              :disabled="loading"
            >
              {{ loading ? 'Creating account...' : 'Create account' }}
            </button>

          </form>

          <p class="login-text">
            Already registered?
            <a href="#">
              Sign in
            </a>
          </p>

          <div
            v-if="message"
            class="message-box"
            :class="{ error: error }"
          >
            {{ message }}
          </div>

        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

const loading = ref(false)
const message = ref('')
const error = ref(false)

const register = async () => {
  message.value = ''
  error.value = false

  if (password.value !== confirmPassword.value) {
    error.value = true
    message.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    const nameParts = name.value.trim().split(' ')

    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || 'User'

    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email.value,
        phone: phone.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    message.value = `Account created successfully for ${data.firstName}!`

    console.log('Registered user:', data)

  } catch (err) {
    error.value = true
    message.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: #f7fff7;
}

.register-header {
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

.register-content {
  padding: 64px 0;
}

.register-card {
  max-width: 560px;
  margin: 0 auto;
  padding: 32px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(16, 42, 39, 0.08);
}

.register-title {
  margin-bottom: 32px;
}

.register-title h1 {
  margin-bottom: 8px;
  color: #102a27;
  font-size: 48px;
  font-weight: 700;
}

.register-title p {
  margin: 0;
  color: #666666;
  font-size: 16px;
}

.form-group {
  margin-bottom: 20px;
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
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #1f6f5b;
  box-shadow: 0 0 0 3px rgba(31, 111, 91, 0.1);
}

.register-btn {
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

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-text {
  margin: 24px 0 0;
  text-align: center;
  color: #666666;
  font-size: 14px;
}

.login-text a {
  color: #1f6f5b;
  text-decoration: none;
  font-weight: 600;
}

.message-box {
  margin-top: 16px;
  padding: 16px;
  border-radius: 10px;
  background: #eef8f2;
  color: #1f6f5b;
  font-size: 14px;
}

.message-box.error {
  background: #fff1f0;
  color: #b42318;
}

@media (max-width: 576px) {
  .register-content {
    padding: 40px 0;
  }

  .register-card {
    padding: 24px;
  }

  .register-title h1 {
    font-size: 36px;
  }
}
</style>