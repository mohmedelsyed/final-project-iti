<template>
  <div class="register-page">

    <div class="register-container">

      <div class="register-card">

        <div class="text-center mb-4">

          <h2>Create Account</h2>

          <p class="text-muted">
            Join CarHub today
          </p>

        </div>

        <form @submit.prevent="handleRegister">

          <!-- Name -->
          <div class="mb-3">

            <label class="form-label">
              Full Name
            </label>

            <input
              v-model="form.name"
              type="text"
              class="form-control"
              placeholder="Enter your name"
              required
            />

          </div>

          <!-- Email -->
          <div class="mb-3">

            <label class="form-label">
              Email
            </label>

            <input
              v-model="form.email"
              type="email"
              class="form-control"
              placeholder="Enter your email"
              required
            />

          </div>

          <!-- Phone -->
          <div class="mb-3">

            <label class="form-label">
              Phone
            </label>

            <input
              v-model="form.phone"
              type="tel"
              class="form-control"
              placeholder="Enter your phone"
              required
            />

          </div>

          <!-- Password -->
          <div class="mb-3">

            <label class="form-label">
              Password
            </label>

            <input
              v-model="form.password"
              type="password"
              class="form-control"
              placeholder="Enter your password"
              minlength="6"
              required
            />

          </div>

          <!-- Role -->
          <div class="mb-3">

            <label class="form-label">
              Account Type
            </label>

            <select
              v-model="form.role"
              class="form-select"
              required
            >

              <option value="buyer">
                Buyer
              </option>

              <option value="seller">
                Seller
              </option>

            </select>

          </div>

          <!-- Error -->
          <div
            v-if="errorMessage"
            class="alert alert-danger"
          >
            {{ errorMessage }}
          </div>

          <!-- Register -->
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="loading"
          >
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>

        </form>

        <div class="text-center mt-4">

          <p>
            Already have an account?

            <RouterLink to="/login">
              Login
            </RouterLink>

          </p>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  role: 'buyer'
})

async function handleRegister() {

  errorMessage.value = ''
  loading.value = true

  try {

    // Check if email already exists
    const existingResponse = await axios.get(
      'http://localhost:3000/users',
      {
        params: {
          email: form.email
        }
      }
    )

    if (existingResponse.data.length > 0) {

      errorMessage.value =
        'This email is already registered.'

      return
    }

    // Create new user
    const response = await axios.post(
      'http://localhost:3000/users',
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role
      }
    )

    const user = response.data

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
      title: 'Account Created',
      text: 'Your account has been created successfully.',
      timer: 1600,
      showConfirmButton: false
    })

    if (user.role === 'seller') {
      router.push('/seller-dashboard')
    } else {
      router.push('/dashboard')
    }

  } catch (error) {

    console.error(
      'Registration error:',
      error
    )

    errorMessage.value =
      'Unable to connect to the API. Make sure JSON Server is running on port 3000.'

  } finally {

    loading.value = false

  }
}
</script>