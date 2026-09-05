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
            <RouterLink class="nav-link" to="/compare">
              Compare
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/seller-dashboard">
              Seller Dashboard
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/dashboard">
              Buyer Dashboard
            </RouterLink>
          </li>

          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/Home">
              Cars
            </RouterLink>
          </li> -->



        </ul>

        <!-- Buttons -->
        <div class="d-flex gap-2">

          <RouterLink to="/login" class="btn btn-dark px-3 rounded-4">
            Login
          </RouterLink>

          <RouterLink to="/register" class="btn btn-primary px-3 rounded-4">
            Register
          </RouterLink>

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
  color: #70c194 !important;
}

.carhub-navbar .nav-link {
  color: white !important;
  margin: 0 8px;
  transition: all 0.3s ease;
  border-radius: 10px;
}

.carhub-navbar .nav-link:hover {
  color: #70C1B3 !important;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius:10px;
}
 

.carhub-navbar .browse-link:hover {
  background-color: #1F6F5B !important;
}

.carhub-navbar .navbar-toggler {
  border: 1px solid white;
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