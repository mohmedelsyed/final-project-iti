<template>
  <div>
    <Navbar />
    <section class="cars-page">
    <div class="container">

      <div class="page-header">
        <h1>Browse Cars</h1>
        <p>Find the perfect car for you</p>
      </div>

      <div class="search-box">
        <i class="bi bi-search"></i>

        <input
          v-model="search"
          type="text"
          placeholder="Search by brand or model..."
        />
      </div>

      <div class="cars-layout">

        <!-- Sidebar -->
        <aside class="sidebar">

          <div class="sidebar-header">
            <h2>Filters</h2>

            <button @click="resetFilters">
              Reset
            </button>
          </div>

          <div class="filter-group">
            <label>Brand</label>

            <select v-model="selectedBrand">
              <option value="all">All Brands</option>

              <option
                v-for="brand in brands"
                :key="brand"
                :value="brand"
              >
                {{ brand }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label>Fuel Type</label>

            <select v-model="selectedFuel">
              <option value="all">All Types</option>

              <option
                v-for="fuel in fuelTypes"
                :key="fuel"
                :value="fuel"
              >
                {{ fuel }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label>Location</label>

            <select v-model="selectedLocation">
              <option value="all">All Locations</option>

              <option
                v-for="location in locations"
                :key="location"
                :value="location"
              >
                {{ location }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label>Transmission</label>

            <select v-model="selectedTransmission">
              <option value="all">All</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Maximum Price</label>

            <select v-model="maxPrice">
              <option value="all">Any Price</option>
              <option :value="1000000">1,000,000 EGP</option>
              <option :value="1500000">1,500,000 EGP</option>
              <option :value="2000000">2,000,000 EGP</option>
            </select>
          </div>

        </aside>

        <!-- Cars -->
        <main class="cars-section">

          <div class="results-header">
            <h2>Available Cars</h2>

            <span>
              {{ filteredCars.length }} cars
            </span>
          </div>

          <div v-if="loading" class="loading">
            <i class="bi bi-arrow-repeat"></i>
            <p>Loading cars...</p>
          </div>

          <div v-else class="row g-4">

            <div
              v-for="car in filteredCars"
              :key="car.id"
              class="col-lg-6"
            >

              <div class="car-card">

                <div class="car-image">

                  <img
                    :src="car.image"
                    :alt="car.name"
                  />

                  <span class="match">
                    {{ car.match }}% Match
                  </span>

                  <button
                    class="favorite"
                    @click="toggleFavorite(car)"
                  >
                    <i
                      :class="car.isFavorite
                        ? 'bi bi-heart-fill'
                        : 'bi bi-heart'"
                    ></i>
                  </button>

                </div>

                <div class="card-content">

                  <div class="car-info">
                    <span>{{ car.brand }}</span>
                    <small>{{ car.year }}</small>
                  </div>
                  <h3>{{ car.name }}</h3>

                  <div class="specs">

                    <span>
                      <i class="bi bi-fuel-pump"></i>
                      {{ car.fuel }}
                    </span>

                    <span>
                      <i class="bi bi-speedometer2"></i>
                      {{ car.mileage.toLocaleString() }} km
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

                  <div class="card-footer">

                    <div>
                      <small>Price</small>

                      <strong>
                        {{ car.price.toLocaleString() }}
                        <em>EGP</em>
                      </strong>
                    </div>

                    <button
                      class="details-btn"
                      @click="showDetails(car)"
                    >
                      Details
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div
            v-if="!loading && filteredCars.length === 0"
            class="no-results"
          >
            <i class="bi bi-car-front"></i>
            <h3>No cars found</h3>
            <p>Try another filter or search.</p>
          </div>

        </main>

      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'

const cars = ref([])

const search = ref('')
const selectedBrand = ref('all')
const selectedFuel = ref('all')
const selectedLocation = ref('all')
const selectedTransmission = ref('all')
const maxPrice = ref('all')

const loading = ref(true)

const brands = computed(() => {
  return [...new Set(cars.value.map(car => car.brand))]
})

const fuelTypes = computed(() => {
  return [...new Set(cars.value.map(car => car.fuel))]
})

const locations = computed(() => {
  return [...new Set(cars.value.map(car => car.location))]
})

const filteredCars = computed(() => {

  return cars.value.filter(car => {

    const text = search.value.toLowerCase()

    const searchMatch =
      car.name.toLowerCase().includes(text) ||
      car.brand.toLowerCase().includes(text)

    const brandMatch =
      selectedBrand.value === 'all' ||
      car.brand === selectedBrand.value

    const fuelMatch =
      selectedFuel.value === 'all' ||
      car.fuel === selectedFuel.value

    const locationMatch =
      selectedLocation.value === 'all' ||
      car.location === selectedLocation.value

    const transmissionMatch =
      selectedTransmission.value === 'all' ||
      car.transmission === selectedTransmission.value

    const priceMatch =
      maxPrice.value === 'all' ||
      car.price <= maxPrice.value

    return (
      searchMatch &&
      brandMatch &&
      fuelMatch &&
      locationMatch &&
      transmissionMatch &&
      priceMatch
    )
  })
})

async function getCars() {

  try {

    const response = await fetch(
      'http://localhost:3000/cars'
    )

    cars.value = await response.json()

    cars.value.forEach(car => {
      car.isFavorite = false
    })

  } catch (error) {

    console.error(
      'Error loading cars:',
      error
    )

  } finally {

    loading.value = false
  }
}

function toggleFavorite(car) {
  car.isFavorite = !car.isFavorite
}

function resetFilters() {

  search.value = ''
  selectedBrand.value = 'all'
  selectedFuel.value = 'all'
  selectedLocation.value = 'all'
  selectedTransmission.value = 'all'
  maxPrice.value = 'all'
}

function showDetails(car) {
  console.log('Selected car:', car)
}

onMounted(() => {
  getCars()
})
</script>

<style scoped>

.cars-page {
  min-height: 100vh;
  padding: 64px 0;
  background: #F7FFF7;
  color: #102A27;
}
.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 8px;
}

.page-header p {
  color: #1F6F5B;
  font-size: 16px;
}

.search-box {
  position: relative;
  margin-bottom: 32px;
}

.search-box i {
  position: absolute;
  left: 16px;
  top: 14px;
  color: #1F6F5B;
}

.search-box input {
  width: 100%;
  height: 48px;
  padding: 8px 12px 8px 44px;
  border: 1px solid #B2DBBF;
  border-radius: 10px;
  outline: none;
  font-family: inherit;
}

.cars-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.sidebar {
  width: 260px;
  flex-shrink: 0;
  padding: 20px;
  background: white;
  border: 1px solid #B2DBBF;
  border-radius: 16px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.sidebar-header h2 {
  font-size: 20px;
  margin: 0;
}

.sidebar-header button {
  border: none;
  background: none;
  color: #1F6F5B;
  font-size: 14px;
  font-weight: 600;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.filter-group select {
  width: 100%;
  height: 42px;
  padding: 8px;
  border: 1px solid #B2DBBF;
  border-radius: 10px;
  outline: none;
  font-family: inherit;
}

.cars-section {
  flex: 1;
  min-width: 0;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.results-header h2 {
  font-size: 32px;
  margin: 0;
}

.results-header span {
  padding: 8px 14px;
  background: #B2DBBF;
  border-radius: 10px;
  font-size: 14px;
}

.car-card {
  height: 100%;
  overflow: hidden;
  background: white;
  border: 1px solid #B2DBBF;
  border-radius: 16px;
  transition: 0.3s;
}

.car-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(16, 42, 39, 0.12);
}

.car-image {
  height: 220px;
  position: relative;
  overflow: hidden;
  background: #B2DBBF;
}

.car-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.match {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 5px 10px;
  border-radius: 10px;
  background: #102A27;
  color: white;
  font-size: 13px;
}

.favorite {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: white;
  color: #1F6F5B;
}

.card-content {
  padding: 20px;
}

.car-info {
  display: flex;
  justify-content: space-between;
  color: #1F6F5B;
  font-weight: 600;
}

.car-info small {
  color: #777;
}

.car-card h3 {
  font-size: 20px;
  margin: 8px 0 16px;
}

.specs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.specs span {
  font-size: 13px;
  color: #555;
}

.specs i {
  color: #1F6F5B;
  margin-right: 3px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-footer small {
  display: block;
  color: #777;
}

.card-footer strong {
  font-size: 18px;
}

.card-footer em {
  font-size: 12px;
  color: #1F6F5B;
  font-style: normal;
}

.details-btn {
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  background: #1F6F5B;
  color: white;
  font-weight: 600;
}

.details-btn:hover {
  background: #102A27;
}

.loading,
.no-results {
  padding: 50px;
  text-align: center;
}

.loading i,
.no-results i {
  font-size: 45px;
  color: #1F6F5B;
}

@media (max-width: 992px) {

  .cars-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

}

@media (max-width: 768px) {

  .cars-page {
    padding: 40px 0;
  }

  .page-header h1 {
    font-size: 36px;
  }

  .results-header h2 {
    font-size: 24px;
  }

}
</style>