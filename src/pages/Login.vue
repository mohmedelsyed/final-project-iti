<template>
  <div class="login-page">

    <div class="login-container">

      <div class="login-card">

        <div class="text-center mb-4">
          <h2>Welcome Back</h2>
          <p class="text-muted">
            Login to your CarHub account
          </p>
        </div>

        <form @submit.prevent="handleLogin">

          <!-- Email -->
          <div class="mb-3">
            <label class="form-label">
              Email
            </label>

            <input v-model="email" type="email" class="form-control" placeholder="Enter your email" required />
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label class="form-label">
              Password
            </label>

            <input v-model="password" type="password" class="form-control" placeholder="Enter your password" required />
          </div>

          <!-- Error -->
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <!-- Login Button -->
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>

        </form>

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
import axios from 'axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const email = ref('')
const password = ref('')

const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true

  try {

    const response = await axios.get(
      'http://localhost:3000/users',
      {
        params: {
          email: email.value,
          password: password.value
        }
      }
    )

    const users = response.data

    if (users.length === 0) {
      errorMessage.value =
        'Invalid email or password.'

      return
    }

    const user = users[0]

    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    )

    localStorage.setItem(
      'isLoggedIn',
      'true'
    )

    await Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: `Welcome ${user.name}!`,
      timer: 1500,
      showConfirmButton: false
    })

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