<template>
  <nav class="navbar navbar-expand-lg carhub-navbar">
    <div class="container">

      <!-- Logo -->
      <RouterLink class="navbar-brand" to="/">
        CarHub
      </RouterLink>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" id="navbarNav">

        <ul class="navbar-nav mx-auto">

          <li class="nav-item">
            <RouterLink class="nav-link browse-link" to="/cars">
              Browse Cars
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/dashboard">
              Dashboard
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/cars">
              Compare
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/dashboard">
              Smart Match
            </RouterLink>
          </li>

        </ul>

        <!-- Auth Buttons / User Profile -->
        <div class="d-flex align-items-center gap-2">

          <template v-if="currentUser">
            <RouterLink to="/dashboard" class="btn btn-outline-light px-3 rounded-4 d-flex align-items-center gap-2 text-decoration-none">
              <i class="bi bi-person-circle"></i>
              <span>{{ currentUser.firstName || currentUser.username }}</span>
            </RouterLink>

            <button @click="logout" class="btn btn-danger px-3 rounded-4" type="button" title="Sign out">
              <i class="bi bi-box-arrow-right"></i>
            </button>
          </template>

          <template v-else>
            <RouterLink to="/login" class="btn btn-dark px-3 rounded-4">
              Login
            </RouterLink>

            <RouterLink to="/register" class="btn btn-primary px-3 rounded-4">
              Register
            </RouterLink>
          </template>

        </div>

      </div>

      <!-- Mobile Button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref(null)

const checkAuth = () => {
  const savedUser = localStorage.getItem('carhub_user')
  if (savedUser) {
    try {
      currentUser.value = JSON.parse(savedUser)
    } catch {
      currentUser.value = null
    }
  } else {
    currentUser.value = null
  }
}

onMounted(() => {
  checkAuth()
  window.addEventListener('storage', checkAuth)
})

const logout = () => {
  localStorage.removeItem('carhub_token')
  localStorage.removeItem('carhub_user')
  currentUser.value = null
  router.push('/login')
}
</script>

<style>
.carhub-navbar {
  background-color: #102A27 !important;
  padding: 16px 0;
  position: relative;
  z-index: 1000;
}

.carhub-navbar .navbar-brand {
  color: white !important;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
}

.carhub-navbar .navbar-brand:hover {
  color: #70C1B3 !important;
}

.carhub-navbar .nav-link {
  color: #ffffff !important;
  margin: 0 8px;
  transition: all 0.3s ease;
  border-radius: 10px;
}

.carhub-navbar .nav-link:hover,
.carhub-navbar .nav-link.router-link-active {
  color: #70C1B3 !important;
  background-color: rgba(112, 193, 179, 0.12);
  border-radius: 10px;
}

.carhub-navbar .browse-link:hover {
  background-color: #1F6F5B !important;
  color: #ffffff !important;
}

.carhub-navbar .btn-primary {
  background-color: #1F6F5B !important;
  border-color: #1F6F5B !important;
  color: #ffffff !important;
}

.carhub-navbar .btn-primary:hover {
  background-color: #70C1B3 !important;
  border-color: #70C1B3 !important;
  color: #102A27 !important;
}

.carhub-navbar .btn-dark {
  background-color: #102A27 !important;
  border-color: #70C1B3 !important;
  color: #ffffff !important;
}

.carhub-navbar .btn-dark:hover {
  background-color: #1F6F5B !important;
  border-color: #1F6F5B !important;
  color: #ffffff !important;
}

.carhub-navbar .navbar-toggler {
  border: 1px solid #ffffff;
  padding: 6px 10px;
}

.carhub-navbar .navbar-toggler-icon {
  filter: invert(1);
}

@media (max-width: 991px) {

  .carhub-navbar .navbar-nav {
    padding-top: 16px;
  }

  .carhub-navbar .nav-link {
    margin: 4px 0;
  }

  .carhub-navbar .d-flex {
    margin-top: 12px;
  }

}

@media (max-width: 576px) {

  .carhub-navbar {
    padding: 12px 0;
  }

}
</style>