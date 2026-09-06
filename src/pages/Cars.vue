<template>
  <section class="cars-page">
    <div class="container">

          <!-- Filters -->
          <div class="filter-bar">

            <div class="filter-control filter-search">
              <i class="bi bi-search"></i>

              <input
                v-model.trim="searchTerm"
                type="search"
                placeholder="Search by name or brand"
              />
            </div>

            <div class="filter-control">
              <select v-model="selectedBrand">
                <option value="all">All brands</option>

                <option
                  v-for="brand in brands"
                  :key="brand"
                  :value="brand"
                >
                  {{ brand }}
                </option>
              </select>
            </div>

            <div class="filter-control">
              <select v-model="selectedFuel">
                <option value="all">All fuel types</option>

                <option
                  v-for="fuel in fuelTypes"
                  :key="fuel"
                  :value="fuel"
                >
                  {{ fuel }}
                </option>
              </select>
            </div>

            <div class="filter-control">
              <select v-model="selectedLocation">
                <option value="all">All locations</option>

                <option
                  v-for="location in locations"
                  :key="location"
                  :value="location"
                >
                  {{ location }}
                </option>
              </select>
            </div>

            <div class="filter-control">
              <select v-model="selectedTransmission">
                <option value="all">All transmissions</option>

                <option
                  v-for="transmission in transmissions"
                  :key="transmission"
                  :value="transmission"
                >
                  {{ transmission }}
                </option>
              </select>
            </div>

            <div class="filter-control">
              <select v-model="maxPrice">
                <option value="all">Any price</option>
                <option :value="1000000">Up to 1,000,000 EGP</option>
                <option :value="1500000">Up to 1,500,000 EGP</option>
                <option :value="2000000">Up to 2,000,000 EGP</option>
              </select>
            </div>

            <button
              v-if="hasActiveFilters"
              class="clear-button"
              type="button"
              @click="clearFilters"
            >
              Clear filters
            </button>

          </div>

          <!-- Loading -->
          <div
            v-if="loading"
            class="feedback-card"
          >
            <div class="spinner-border" role="status"></div>
            <p>Loading cars...</p>
          </div>

          <!-- Error -->
          <div
            v-else-if="errorMessage"
            class="feedback-card error-card"
          >
            <i class="bi bi-wifi-off"></i>

            <h3>We couldn't load the cars</h3>

            <p>{{ errorMessage }}</p>

            <button
              class="retry-button"
              type="button"
              @click="getCars"
            >
              <i class="bi bi-arrow-clockwise"></i>
              Try Again
            </button>
          </div>

          <!-- Cars -->
          <div
            v-else-if="filteredCars.length"
            class="row g-4"
          >

            <div
              v-for="car in filteredCars"
              :key="car.id"
              class="col-12 col-md-6 col-lg-4"
            >

              <article class="car-card">

                <div class="car-image-wrap">
                  <img
                    :src="car.image"
                    :alt="car.name"
                    class="car-image"
                  />

                  <span class="match-badge">
                    <i class="bi bi-stars"></i>
                    {{ car.match }}% Match
                  </span>
                </div>

                <div class="car-card-body">

                  <div class="car-topline">
                    <span>{{ car.brand }}</span>
                    <span>{{ car.year }}</span>
                  </div>

                  <h2>{{ car.name }}</h2>

                  <div class="car-specs">

                    <span>
                      <i class="bi bi-fuel-pump"></i>
                      {{ car.fuel }}
                    </span>

                    <span>
                      <i class="bi bi-gear"></i>
                      {{ car.transmission }}
                    </span>

                    <span>
                      <i class="bi bi-geo-alt"></i>
                      {{ car.location }}
                    </span>

                    <span>
                      <i class="bi bi-speedometer2"></i>
                      {{ car.mileage }} km
                    </span>

                  </div>

                  <div class="car-footer">

                    <div>
                      <small>Starting from</small>

                      <strong>
                        {{ formatPrice(car.price) }}
                      </strong>
                    </div>

                    <button
                      class="details-link"
                      type="button"
                      @click="showDetails(car)"
                    >
                      Details
                      <i class="bi bi-arrow-right"></i>
                    </button>

                  </div>

                </div>

              </article>

            </div>

          </div>

          <!-- Empty -->
          <div
            v-else
            class="feedback-card"
          >
            <i class="bi bi-car-front"></i>

            <h3>No cars found</h3>

            <p>
              Try changing your search or filters.
            </p>

            <button
              class="retry-button"
              type="button"
              @click="clearFilters"
            >
              Clear filters
            </button>
          </div>

        </div>
      </section>
    </main>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cars = ref([])
const loading = ref(true)
const errorMessage = ref('')

const searchTerm = ref('')
const selectedBrand = ref('all')
const selectedFuel = ref('all')
const selectedLocation = ref('all')
const selectedTransmission = ref('all')
const maxPrice = ref('all')

const brands = computed(() => {
  return [
    ...new Set(
      cars.value
        .map((car) => car.brand)
        .filter(Boolean)
    )
  ].sort()
})

const fuelTypes = computed(() => {
  return [
    ...new Set(
      cars.value
        .map((car) => car.fuel)
        .filter(Boolean)
    )
  ].sort()
})

const locations = computed(() => {
  return [
    ...new Set(
      cars.value
        .map((car) => car.location)
        .filter(Boolean)
    )
  ].sort()
})

const transmissions = computed(() => {
  return [
    ...new Set(
      cars.value
        .map((car) => car.transmission)
        .filter(Boolean)
    )
  ].sort()
})

const filteredCars = computed(() => {
  const text = searchTerm.value.toLowerCase()

  return cars.value.filter((car) => {

    const name = String(car.name || '').toLowerCase()
    const brand = String(car.brand || '').toLowerCase()
    const location = String(car.location || '').toLowerCase()

    const searchMatch =
      !text ||
      name.includes(text) ||
      brand.includes(text) ||
      location.includes(text)

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
      Number(car.price) <= Number(maxPrice.value)

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

const hasActiveFilters = computed(() => {
  return Boolean(
    searchTerm.value ||
    selectedBrand.value !== 'all' ||
    selectedFuel.value !== 'all' ||
    selectedLocation.value !== 'all' ||
    selectedTransmission.value !== 'all' ||
    maxPrice.value !== 'all'
  )
})

async function getCars() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error(
        `The car service returned ${response.status}.`
      )
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error(
        'The car service returned an unexpected response.'
      )
    }

    cars.value = data.map((car) => ({
      ...car,
      isFavorite: car.isFavorite || false
    }))

  } catch (error) {
    cars.value = []

    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Unable to load cars.'
  } finally {
    loading.value = false
  }
}

function clearFilters() {
  searchTerm.value = ''
  selectedBrand.value = 'all'
  selectedFuel.value = 'all'
  selectedLocation.value = 'all'
  selectedTransmission.value = 'all'
  maxPrice.value = 'all'
}

function showDetails(car) {
  router.push(`/cars/${car.id}`)
}

function formatPrice(price) {
  return `${new Intl.NumberFormat('en-US').format(
    Number(price) || 0
  )} EGP`
}

onMounted(getCars)
</script>

<style scoped>
.cars-page {
  min-height: 100vh;
  background: #f7fff7;
  color: #102a27;
}

.cars-hero {
  padding: 80px 0;
  background: linear-gradient(
    125deg,
    #102a27 0%,
    #1f6f5b 50%,
    #70c1b3 100%
  );
  color: white;
}

.cars-hero h1 {
  margin: 15px 0;
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 750;
}

.cars-hero p {
  max-width: 600px;
  margin: 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: 18px;
}

.section-kicker {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: #b2dbbf;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.cars-section {
  padding: 70px 0;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
}

.filter-control {
  min-width: 180px;
  flex: 1;
}

.filter-search {
  position: relative;
}

.filter-search i {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #1f6f5b;
}

.filter-control input,
.filter-control select {
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 1px solid #dce9df;
  border-radius: 10px;
  background: white;
  color: #102a27;
  outline: none;
}

.filter-search input {
  padding-left: 42px;
}

.filter-control input:focus,
.filter-control select:focus {
  border-color: #1f6f5b;
}

.clear-button {
  height: 48px;
  padding: 0 20px;
  border: 0;
  border-radius: 10px;
  background: #102a27;
  color: white;
  cursor: pointer;
}

.car-card {
  height: 100%;
  overflow: hidden;
  border: 1px solid #e0ebe3;
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 30px rgba(16, 42, 39, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.car-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 40px rgba(16, 42, 39, 0.13);
}

.car-image-wrap {
  position: relative;
  height: 230px;
  overflow: hidden;
}

.car-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.match-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 7px 11px;
  border-radius: 20px;
  background: #b2dbbf;
  color: #102a27;
  font-size: 13px;
  font-weight: 700;
}

.car-card-body {
  padding: 22px;
}

.car-topline {
  display: flex;
  justify-content: space-between;
  color: #70c1b3;
  font-size: 14px;
  font-weight: 700;
}

.car-card h2 {
  margin: 8px 0 18px;
  color: #102a27;
  font-size: 22px;
}

.car-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 22px;
}

.car-specs span {
  padding: 7px 10px;
  border-radius: 8px;
  background: #f1f7f2;
  color: #555;
  font-size: 13px;
}

.car-specs i {
  color: #1f6f5b;
}

.car-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding-top: 18px;
  border-top: 1px solid #edf2ee;
}

.car-footer small {
  display: block;
  margin-bottom: 3px;
  color: #888;
}

.car-footer strong {
  color: #1f6f5b;
  font-size: 17px;
}

.details-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  border: 0;
  border-radius: 9px;
  background: #1f6f5b;
  color: white;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.details-link:hover {
  background: #102a27;
  color: white;
}

.feedback-card {
  padding: 60px 20px;
  border-radius: 20px;
  background: white;
  text-align: center;
  box-shadow: 0 10px 30px rgba(16, 42, 39, 0.07);
}

.feedback-card i {
  margin-bottom: 15px;
  color: #1f6f5b;
  font-size: 42px;
}

.feedback-card p {
  color: #777;
}

.error-card i {
  color: #b54b4b;
}

.retry-button {
  padding: 11px 20px;
  border: 0;
  border-radius: 9px;
  background: #1f6f5b;
  color: white;
  cursor: pointer;
}

@media (max-width: 767px) {
  .cars-hero {
    padding: 60px 0;
  }

  .cars-section {
    padding: 45px 0;
  }

  .filter-control {
    min-width: 100%;
  }

  .car-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .details-link {
    width: 100%;
    justify-content: center;
  }
}
</style>