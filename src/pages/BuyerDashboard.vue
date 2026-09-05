<template>
  <div class="dashboard-page">
    <Navbar/>

    <!-- Hero -->
    <section class="hero-section">
      <div class="container">

        <div class="hero-content">

          <span class="hero-badge">
            SMART CAR MATCHING
          </span>

          <h1>
            Find the right car
            <br>
            for your budget and city.
          </h1>

          <p>
            Discover verified cars that match your needs,
            budget and location.
          </p>

        </div>


        <!-- Search -->
        <div class="search-card">

          <div class="row g-4 align-items-end">

            <div class="col-12 col-md-4">

              <label>
                Your budget
              </label>

              <div class="budget-value">
                EGP {{ budget.toLocaleString() }}
              </div>

              <input
                v-model.number="budget"
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                class="budget-slider"
              >

            </div>


            <div class="col-12 col-md-3">

              <label>
                Your location
              </label>

              <select v-model="location">
                <option value="">
                  Select city
                </option>

                <option value="Cairo">
                  Cairo
                </option>

                <option value="Alexandria">
                  Alexandria
                </option>

                <option value="Damietta">
                  Damietta
                </option>

                <option value="Giza">
                  Giza
                </option>

              </select>

            </div>


            <div class="col-12 col-md-2">

              <button
                type="button"
                class="location-btn"
                :disabled="detectingLocation"
                @click="detectLocation"
              >

                <i class="bi bi-geo-alt"></i>

                {{
                  detectingLocation
                    ? 'Detecting...'
                    : 'Detect my location'
                }}

              </button>

            </div>


            <div class="col-12 col-md-3">

              <button
                type="button"
                class="search-btn"
                :disabled="loading"
                @click="searchCars"
              >

                <i class="bi bi-search"></i>

                {{
                  loading
                    ? 'Loading...'
                    : 'Search matching cars'
                }}

              </button>

            </div>

          </div>

        </div>

      </div>
    </section>


    <!-- Stats -->
    <section class="stats-section">

      <div class="container">

        <div class="row g-4">

          <div class="col-12 col-md-4">

            <div class="stat-item">

              <strong>10K+</strong>

              <span>
                Listings
              </span>

            </div>

          </div>


          <div class="col-12 col-md-4">

            <div class="stat-item">

              <strong>25+</strong>

              <span>
                Cities
              </span>

            </div>

          </div>


          <div class="col-12 col-md-4">

            <div class="stat-item">

              <strong>500+</strong>

              <span>
                Services
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- Categories -->
    <section class="categories-section">

      <div class="container">

        <div class="section-heading">

          <span>
            EXPLORE
          </span>

          <h2>
            Browse by Category
          </h2>

          <p>
            Find the perfect car based on your lifestyle.
          </p>

        </div>


        <div class="row g-4">

          <div
            v-for="category in categories"
            :key="category.name"
            class="col-12 col-md-6 col-lg-4"
          >

            <div class="category-card">

              <div class="category-image">

                <i :class="category.icon"></i>

              </div>


              <div class="category-content">

                <h3>
                  {{ category.name }}
                </h3>

                <p>
                  {{ category.description }}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- Matches -->
    <section class="matches-section">

      <div class="container">

        <div class="section-heading">

          <span>
            PERSONALIZED FOR YOU
          </span>

          <h2>
            Your Top Matches
          </h2>

          <p>
            Cars selected based on your preferences.
          </p>

        </div>


        <!-- Active Brand Filter -->
        <div
          v-if="activeBrandFilter"
          class="filter-chip"
        >

          Filtering by:

          <strong>
            {{ activeBrandFilter }}
          </strong>

          <button
            type="button"
            @click="clearBrandFilter"
          >

            <i class="bi bi-x"></i>

          </button>

        </div>


        <!-- Loading -->
        <div
          v-if="loading"
          class="api-message"
        >

          <i class="bi bi-arrow-repeat"></i>

          Loading cars from API...

        </div>


        <!-- Error -->
        <div
          v-if="apiError"
          class="api-message error"
        >

          {{ apiError }}

        </div>


        <!-- Cars -->
        <div class="row g-4">

          <div
            v-for="car in filteredCars"
            :key="car.id"
            class="col-12 col-md-6 col-lg-4"
          >

            <div class="car-card">

              <div class="car-image">
                <img :src="car.image" :alt="car.name" class="car-photo" >




                

                <span class="match-badge">

                  {{ car.match }}% Match

                </span>


                <button
                  type="button"
                  class="favorite-btn"
                  @click="toggleFavorite(car)"
                >

                  <i
                    :class="
                      car.favorite
                        ? 'bi bi-heart-fill'
                        : 'bi bi-heart'
                    "
                  ></i>

                </button>

              </div>


              <div class="car-content">

                <div class="car-title">

                  <div>

                    <h3>
                      {{ car.name }}
                    </h3>

                    <span>
                      {{ car.brand }}
                    </span>

                  </div>


                  <strong>
                    EGP {{ Number(car.price).toLocaleString() }}
                  </strong>

                </div>


                <div class="car-info">

                  <span>

                    <i class="bi bi-calendar3"></i>

                    {{ car.year }}

                  </span>


                  <span>

                    <i class="bi bi-gear"></i>

                    {{ car.transmission }}

                  </span>


                  <span>

                    <i class="bi bi-geo-alt"></i>

                    {{ car.location }}

                  </span>

                </div>


                <button
                  type="button"
                  class="details-btn"
                  @click="viewDetails(car)"
                >

                  View details

                </button>

              </div>

            </div>

          </div>

        </div>


        <!-- No Cars -->
        <div
          v-if="
            !loading &&
            !apiError &&
            filteredCars.length === 0
          "
          class="api-message"
        >

          No cars found. Try changing your budget
          or clearing the brand filter.

        </div>

      </div>

    </section>


    <!-- Brands & Tools -->
    <section class="tools-section">

      <div class="container">

        <div class="section-heading">

          <span>
            POPULAR
          </span>

          <h2>
            Popular Brands
          </h2>

        </div>


        <!-- Brands -->
        <div class="brands-list">

          <button
            v-for="brand in brands"
            :key="brand"
            type="button"
            class="brand-btn"
            :class="{
              active: activeBrandFilter === brand
            }"
            @click="selectBrand(brand)"
          >

            {{ brand }}

          </button>

        </div>


        <!-- Tools -->
        <div class="section-heading tools-heading">

          <span>
            TOOLS
          </span>

          <h2>
            Helpful Tools
          </h2>

        </div>


        <div class="row g-4">

          <div class="col-12 col-md-4">

            <div class="tool-card">

              <div class="tool-icon">

                <i class="bi bi-calculator"></i>

              </div>

              <h3>
                Financing calculator
              </h3>

              <p>
                Estimate your monthly car payments.
              </p>

              <button type="button">

                Try calculator

                <i class="bi bi-arrow-right"></i>

              </button>

            </div>

          </div>


          <div class="col-12 col-md-4">

            <div class="tool-card">

              <div class="tool-icon">

                <i class="bi bi-stars"></i>

              </div>

              <h3>
                Find my perfect car
              </h3>

              <p>
                Answer a few questions and get your best matches.
              </p>

              <button type="button">

                Start quiz

                <i class="bi bi-arrow-right"></i>

              </button>

            </div>

          </div>


          <div class="col-12 col-md-4">

            <div class="tool-card">

              <div class="tool-icon">

                <i class="bi bi-tools"></i>

              </div>

              <h3>
                Nearby auto services
              </h3>

              <p>
                Find trusted services near your location.
              </p>

              <button type="button">

                Explore services

                <i class="bi bi-arrow-right"></i>

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- Verification -->
    <section class="verification-section">

      <div class="container">

        <div class="verification-banner">

          <div class="verification-content">

            <span class="verification-icon">

              <i class="bi bi-patch-check-fill"></i>

            </span>


            <div>

              <h2>
                Every listing is dealer-verified
              </h2>

              <p>
                Shop with confidence knowing our listings are verified.
              </p>

            </div>

          </div>


          <button type="button">

            Browse inventory

            <i class="bi bi-arrow-right"></i>

          </button>

        </div>

      </div>

    </section>


    <FooterSection/>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import FooterSection from '../components/FooterSection.vue'
import Navbar from '../components/Navbar.vue'



const API_URL = 'http://localhost:3000/cars'

const budget = ref(5000000)
const location = ref('')

const cars = ref([])
const loading = ref(false)
const apiError = ref('')
const detectingLocation = ref(false)
const activeBrandFilter = ref('')

const categories = [
  {
    name: 'Sedan',
    description: 'Comfortable cars for everyday driving.',
    icon: 'bi bi-car-front-fill'
  },
  {
    name: 'SUV',
    description: 'Spacious vehicles for family and adventure.',
    icon: 'bi bi-truck'
  },
  {
    name: 'Hatchback',
    description: 'Practical and compact city cars.',
    icon: 'bi bi-car-front'
  },
  {
    name: 'Coupe',
    description: 'Sporty cars with a stylish design.',
    icon: 'bi bi-car-front-fill'
  },
  {
    name: 'Pickup',
    description: 'Powerful vehicles built for work.',
    icon: 'bi bi-truck-front-fill'
  },
  {
    name: 'Electric',
    description: 'Modern cars with efficient electric power.',
    icon: 'bi bi-lightning-charge-fill'
  }
]

const brands = [
  'BMW',
  'Toyota',
  'Hyundai',
  'Mercedes',
  'Kia',
  'Nissan',
  'Honda',
  'Tesla'
]


// Get cars from Fake API
const loadCars = async () => {
  loading.value = true
  apiError.value = ''

  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error('Failed to load cars')
    }

    const data = await response.json()

    cars.value = data.map(car => ({
      ...car,
      favorite: car.favorite || false
    }))

  } catch (error) {
    console.error('API Error:', error)

    apiError.value =
      'Unable to load cars from API. Make sure JSON Server is running.'
  } finally {
    loading.value = false
  }
}


// Filter cars
const filteredCars = computed(() => {

  return cars.value
    .filter(car => {

      const budgetMatch =
        Number(car.price) <= budget.value

      const locationMatch =
        !location.value ||
        car.location?.toLowerCase() ===
        location.value.toLowerCase()

      const brandMatch =
        !activeBrandFilter.value ||
        car.brand === activeBrandFilter.value

      return (
        budgetMatch &&
        locationMatch &&
        brandMatch
      )
    })
    .sort((a, b) => {
      return Number(b.match) - Number(a.match)
    })
    .slice(0, 6)

})


// Search
const searchCars = () => {
  loadCars()
}


// Detect location
const detectLocation = () => {

  if (!navigator.geolocation) {

    apiError.value =
      'Geolocation is not supported by your browser.'

    return
  }

  detectingLocation.value = true
  apiError.value = ''

  navigator.geolocation.getCurrentPosition(

    () => {

      // Fake API project
      // We use Cairo as the detected location
      location.value = 'Cairo'

      detectingLocation.value = false

      loadCars()
    },

    error => {

      console.error(
        'Location Error:',
        error
      )

      apiError.value =
        'Unable to detect your location.'

      detectingLocation.value = false
    }
  )
}


// Favorite
const toggleFavorite = (car) => {

  car.favorite = !car.favorite

}


// View details
const viewDetails = (car) => {

  console.log(
    'Selected car:',
    car
  )

}


// Select brand
const selectBrand = (brand) => {

  if (activeBrandFilter.value === brand) {

    activeBrandFilter.value = ''

  } else {

    activeBrandFilter.value = brand

  }

}


// Clear brand filter
const clearBrandFilter = () => {

  activeBrandFilter.value = ''

}


// Handle broken image
const handleImageError = (event) => {

  event.target.style.display = 'none'

}


// Load cars when page opens
onMounted(() => {

  loadCars()

})
</script>
<style scoped>

.dashboard-page {
  min-height: 100vh;
   background:
    linear-gradient(
      45deg,
      #102A27,
      #1F6F5B,
      #70C1B3,
      #B2DBBF,
      #F7FFF7
    );
}

.dashboard-navbar {
  padding: 16px 0;
  background: #ffffff;
  border-bottom: 1px solid #e5eee9;
}

.navbar-content {
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
}

.logo span {
  font-size: 24px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-links a {
  color: #1f6f5b;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.menu-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: #f7fff7;
  color: #102a27;
  font-size: 24px;
  cursor: pointer;
}

.hero-section {
  padding: 64px 0;
  background-image: linear-gradient(
    45deg,
    #102a27,
    #1f6f5b,
    #70c1b3,
    #b2dbbf,
    #f7fff7
  );
}

.hero-content {
  max-width: 700px;
  margin-bottom: 32px;
  color: #ffffff;
}

.hero-badge {
  display: inline-block;
  margin-bottom: 16px;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  font-size: 14px;
  font-weight: 600;
}

.hero-content h1 {
  margin-bottom: 16px;
  font-size: 48px;
  font-weight: 700;
}

.hero-content p {
  margin: 0;
  font-size: 16px;
}

.search-card {
  padding: 24px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(16, 42, 39, 0.12);
}

.search-card label {
  display: block;
  margin-bottom: 8px;
  color: #102a27;
  font-size: 14px;
  font-weight: 600;
}

.budget-value {
  margin-bottom: 8px;
  color: #1f6f5b;
  font-size: 20px;
  font-weight: 700;
}

.budget-slider {
  width: 100%;
  accent-color: #1f6f5b;
}

.search-card select {
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border: 1px solid #d9e5df;
  border-radius: 10px;
  background: #ffffff;
  color: #102a27;
}

.location-btn,
.search-btn {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.location-btn {
  border: 1px solid #1f6f5b;
  background: #ffffff;
  color: #1f6f5b;
}

.search-btn {
  border: none;
  background: #1f6f5b;
  color: #ffffff;
}

.location-btn:disabled,
.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.stats-section {
  padding: 32px 0;
}

.stat-item {
  padding: 20px;
  text-align: center;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(16, 42, 39, 0.06);
}

.stat-item strong {
  display: block;
  color: #1f6f5b;
  font-size: 28px;
}

.stat-item span {
  color: #666666;
  font-size: 14px;
}

.categories-section,
.matches-section,
.tools-section,
.verification-section {
  padding: 64px 0;
}

.section-heading {
  margin-bottom: 32px;
}

.section-heading > span {
  display: inline-block;
  margin-bottom: 8px;
  color: #1f6f5b;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
}

.section-heading h2 {
  margin-bottom: 8px;
  color: #102a27;
  font-size: 32px;
  font-weight: 700;
}

.section-heading p {
  margin: 0;
  color: #666666;
  font-size: 16px;
}

.category-card {
  height: 100%;
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(16, 42, 39, 0.06);
}

.category-image {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b2dbbf;
  color: #102a27;
  font-size: 55px;
}

.category-content {
  padding: 20px;
}

.category-content h3 {
  margin-bottom: 8px;
  color: #102a27;
  font-size: 20px;
}

.category-content p {
  margin: 0;
  color: #666666;
  font-size: 14px;
}

.api-message {
  margin-bottom: 24px;
  padding: 16px 20px;
  border-radius: 10px;
  background: #ffffff;
  color: #1f6f5b;
  text-align: center;
  font-weight: 600;
}

.api-message.error {
  color: #a33a3a;
  background: #fff1f1;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 8px 12px;
  border-radius: 10px;
  background: #b2dbbf;
  color: #102a27;
  font-size: 14px;
}

.filter-chip button {
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #102a27;
  color: #ffffff;
  cursor: pointer;
}

.car-card {
  height: 100%;
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(16, 42, 39, 0.08);
}

.car-image {
  position: relative;
  height: 210px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b2dbbf;
}

.car-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.match-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 10px;
  border-radius: 10px;
  background: #1f6f5b;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  color: #1f6f5b;
  cursor: pointer;
}

.car-content {
  padding: 20px;
}

.car-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.car-title h3 {
  margin-bottom: 4px;
  color: #102a27;
  font-size: 20px;
}

.car-title span {
  color: #666666;
  font-size: 14px;
}

.car-title strong {
  color: #1f6f5b;
  font-size: 16px;
  white-space: nowrap;
}

.car-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0;
}

.car-info span {
  color: #666666;
  font-size: 13px;
}

.car-info i {
  margin-right: 4px;
  color: #1f6f5b;
}

.details-btn {
  width: 100%;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background: #1f6f5b;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

.brands-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.brand-btn {
  padding: 12px 24px;
  border: 1px solid #1f6f5b;
  border-radius: 10px;
  background: #ffffff;
  color: #1f6f5b;
  font-weight: 600;
  cursor: pointer;
}

.brand-btn:hover,
.brand-btn.active {
  background: #1f6f5b;
  color: #ffffff;
}

.tools-heading {
  margin-top: 64px;
}

.tool-card {
  height: 100%;
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(16, 42, 39, 0.06);
}

.tool-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: 10px;
  background: #b2dbbf;
  color: #102a27;
  font-size: 24px;
}

.tool-card h3 {
  margin-bottom: 8px;
  color: #102a27;
  font-size: 20px;
}

.tool-card p {
  margin-bottom: 20px;
  color: #666666;
  font-size: 14px;
}

.tool-card button {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background: #1f6f5b;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

.verification-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  border-radius: 20px;
  background: #102a27;
  color: #ffffff;
}

.verification-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.verification-icon {
  font-size: 40px;
  color: #70c1b3;
}

.verification-banner h2 {
  margin-bottom: 8px;
  font-size: 24px;
}

.verification-banner p {
  margin: 0;
  color: #b2dbbf;
}

.verification-banner button {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background: #70c1b3;
  color: #102a27;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
}

.footer {
  padding: 48px 0 24px;
  background: #102a27;
  color: #ffffff;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
}

.footer-logo {
  font-size: 24px;
  font-weight: 700;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-column h4 {
  margin-bottom: 8px;
  font-size: 16px;
}

.footer-column a {
  color: #b2dbbf;
  text-decoration: none;
  font-size: 14px;
}

.footer-bottom {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: #b2dbbf;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 768px) {

  .hero-section {
    padding: 40px 0;
  }

  .hero-content h1 {
    font-size: 36px;
  }

  .categories-section,
  .matches-section,
  .tools-section,
  .verification-section {
    padding: 40px 0;
  }

  .verification-banner {
    flex-direction: column;
    align-items: flex-start;
  }

  .verification-banner button {
    width: 100%;
  }

  .footer-content {
    grid-template-columns: 1fr 1fr;
  }

}

@media (max-width: 576px) {

  .nav-links {
    gap: 8px;
  }

  .nav-links a {
    font-size: 13px;
  }

  .hero-content h1 {
    font-size: 32px;
  }

  .section-heading h2 {
    font-size: 28px;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }

}

</style>