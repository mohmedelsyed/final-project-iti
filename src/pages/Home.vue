<template>
  <div>
    <Navbar />

    <main class="home-page">
      <section class="hero-section">
        <div class="hero-orb hero-orb-one" aria-hidden="true"></div>
        <div class="hero-orb hero-orb-two" aria-hidden="true"></div>

        <div class="container position-relative">
          <div class="row align-items-center hero-content">
            <div class="col-lg-8">
              <span class="hero-eyebrow">
                <i class="bi bi-stars"></i> Smarter car shopping
              </span>

              <h1>
                Find the car that fits <span>your life.</span>
              </h1>

              <p class="hero-copy">
                Explore quality cars, compare your options, and drive away with confidence.
              </p>

              <form class="search-panel" @submit.prevent="scrollToCars">
                <label class="visually-hidden" for="car-search">
                  Search for a car
                </label>

                <i class="bi bi-search search-icon" aria-hidden="true"></i>

                <input id="car-search" v-model.trim="searchTerm" type="search"
                  placeholder="Search by model, brand, or location" />

                <button type="submit" class="search-button">
                  Search cars
                </button>
              </form>

              <div class="hero-actions">
                <RouterLink class="btn-primary-home" to="/cars">
                  Browse all cars
                  <i class="bi bi-arrow-up-right"></i>
                </RouterLink>

                <a class="hero-text-link" href="#featured-cars">
                  Explore featured
                  <i class="bi bi-arrow-down"></i>
                </a>
              </div>
            </div>

            <div class="col-lg-4 d-none d-lg-block">
              <div class="hero-stat-card">
                <span class="stat-icon">
                  <i class="bi bi-car-front-fill"></i>
                </span>

                <p>Find your perfect match</p>
                <strong>
                  {{ cars.length || '—' }} <small>cars to explore</small>
                </strong>

                <div class="stat-line">
                  <span></span>
                </div>

                <div class="stat-foot">
                  <i class="bi bi-shield-check"></i>
                  Curated choices, clear details
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-cars" class="featured-section">
        <div class="container">
          <div class="section-heading">
            <div>
              <span class="section-kicker">Handpicked for you</span>
              <h2>Featured cars</h2>
              <p>
                Discover vehicles selected to make your next move easier.
              </p>
            </div>

            <RouterLink class="all-cars-link d-none d-sm-inline-flex" to="/cars">
              View all cars
              <i class="bi bi-arrow-right"></i>
            </RouterLink>
          </div>

          <div class="filter-bar" aria-label="Car filters">
            <div class="filter-control filter-search">
              <i class="bi bi-search" aria-hidden="true"></i>

              <label class="visually-hidden" for="featured-search">
                Search featured cars
              </label>

              <input id="featured-search" v-model.trim="searchTerm" type="search" placeholder="Search cars" />
            </div>

            <div class="filter-control">
              <label class="visually-hidden" for="brand-filter">
                Brand
              </label>

              <select id="brand-filter" v-model="selectedBrand">
                <option value="">All brands</option>
                <option v-for="brand in brands" :key="brand" :value="brand">
                  {{ brand }}
                </option>
              </select>
            </div>

            <div class="filter-control">
              <label class="visually-hidden" for="location-filter">
                Location
              </label>

              <select id="location-filter" v-model="selectedLocation">
                <option value="">All locations</option>

                <option v-for="location in locations" :key="location" :value="location">
                  {{ location }}
                </option>
              </select>
            </div>

            <div class="filter-control">
              <label class="visually-hidden" for="price-filter">
                Maximum price
              </label>

              <select id="price-filter" v-model="maxPrice">
                <option value="">Any price</option>
                <option value="1000000">Up to 1,000,000 EGP</option>
                <option value="1500000">Up to 1,500,000 EGP</option>
                <option value="2000000">Up to 2,000,000 EGP</option>
              </select>
            </div>

            <button v-if="hasActiveFilters" class="clear-filters" type="button" @click="clearFilters">
              Clear filters
            </button>
          </div>

          <div v-if="loading" class="row g-4" aria-live="polite" aria-label="Loading cars">
            <div v-for="placeholder in 3" :key="placeholder" class="col-12 col-md-6 col-lg-4">
              <div class="car-skeleton">
                <div></div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <div v-else-if="errorMessage" class="feedback-card error-card" role="alert">
            <span class="feedback-icon">
              <i class="bi bi-wifi-off"></i>
            </span>

            <div>
              <h3>We couldn’t load the cars</h3>
              <p>{{ errorMessage }}</p>
            </div>

            <button class="retry-button" type="button" @click="fetchCars">
              <i class="bi bi-arrow-clockwise"></i>
              Try Again
            </button>
          </div>

          <div v-else-if="filteredCars.length" class="row g-4">
            <article v-for="car in filteredCars" :key="car.id" class="col-12 col-md-6 col-lg-4">
              <div class="car-card">
                <div class="car-image-wrap">
                  <img :src="car.image" :alt="car.name" class="car-image" />

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

                  <h3>{{ car.name }}</h3>

                  <div class="car-specs">
                    <span>
                      <i class="bi bi-gear"></i>
                      {{ car.transmission }}
                    </span>

                    <span>
                      <i class="bi bi-geo-alt"></i>
                      {{ car.location }}
                    </span>
                  </div>
                  <div class="car-footer">
                    <div>
                      <small>Starting from</small>
                      <strong>{{ formatPrice(car.price) }}</strong>
                    </div>
                    <RouterLink class="details-link" :to="`/cars/${car.id}`"
                      :aria-label="`View details for ${car.name}`">
                      Details
                      <i class="bi bi-arrow-right"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div v-else class="feedback-card empty-card">
            <span class="feedback-icon">
              <i class="bi bi-car-front"></i>
            </span>

            <div>
              <h3>No cars found</h3>
              <p>
                Try changing your search or removing one of the filters.
              </p>
            </div>

            <button class="retry-button" type="button" @click="clearFilters">
              Clear filters
            </button>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <div class="cta-card">
            <div>
              <span class="section-kicker cta-kicker">
                Ready when you are
              </span>

              <h2>Have a car to sell?</h2>

              <p>
                Reach people who are actively looking for their next car on CarHub.
              </p>
            </div>

            <RouterLink class="cta-button" to="/seller-dashboard">
              List your car
              <i class="bi bi-arrow-up-right"></i>
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue'

const API_URL = 'http://localhost:3000/cars'

const cars = ref([])
const searchTerm = ref('')
const selectedBrand = ref('')
const selectedLocation = ref('')
const maxPrice = ref('')
const loading = ref(true)
const errorMessage = ref('')
const brands = computed(() =>
  [...new Set(
    cars.value
      .map((car) => car.brand)
      .filter(Boolean)
  )].sort()
)

const locations = computed(() =>
  [...new Set(
    cars.value
      .map((car) => car.location)
      .filter(Boolean)
  )].sort()
)

const filteredCars = computed(() => {
  const query = searchTerm.value.toLocaleLowerCase()
  const priceLimit = Number(maxPrice.value)

  return cars.value.filter((car) => {
    const searchableText = [
      car.name,
      car.brand,
      car.location
    ]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase()

    const matchesQuery =
      !query || searchableText.includes(query)
    const matchesBrand =
      !selectedBrand.value
    car.brand === selectedBrand.value

    const matchesLocation =
      !selectedLocation.value
    car.location === selectedLocation.value

    const matchesPrice =
      !priceLimit
    Number(car.price) <= priceLimit

    return (
      matchesQuery &&
      matchesBrand &&
      matchesLocation &&
      matchesPrice
    )
  })
})

const hasActiveFilters = computed(() =>
  Boolean(
    searchTerm.value ||
    selectedBrand.value ||
    selectedLocation.value ||
    maxPrice.value
  )
)

async function fetchCars() {
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

    cars.value = data
  } catch (error) {
    cars.value = []
    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Please check your connection and try again.'
  } finally {
    loading.value = false
  }
}

function clearFilters() {
  searchTerm.value = ''
  selectedBrand.value = ''
  selectedLocation.value = ''
  maxPrice.value = ''
}

function scrollToCars() {
  document
    .getElementById('featured-cars')
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
}

function formatPrice(price) {
  return `${new Intl.NumberFormat('en-US').format(
    Number(price) || 0
  )} EGP`
}

onMounted(fetchCars)
</script>

<style scoped>
.home-page {
  overflow: hidden;
  background: #f7fff7;
  color: #102a27;
}

.hero-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 96px 0 88px;
  background: linear-gradient(125deg, #102a27 0%, #1f6f5b 50%, #70c1b3 100%);
}

.hero-section::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  content: '';
  background: linear-gradient(45deg, rgba(16, 42, 39, .25), transparent 50%, rgba(247, 255, 247, .2));
}

.hero-orb {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  filter: blur(3px);
}

.hero-orb-one {
  top: -180px;
  right: -70px;
  width: 480px;
  height: 480px;
  background: rgba(178, 219, 191, .27);
}

.hero-orb-two {
  right: 24%;
  bottom: -180px;
  width: 280px;
  height: 280px;
  border: 1px solid rgba(247, 255, 247, .24);
}

.hero-content {
  min-height: 420px;
}

.hero-eyebrow,
.section-kicker {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: #b2dbbf;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.hero-section h1 {
  max-width: 760px;
  margin: 16px 0;
  color: #fff;
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 750;
  letter-spacing: -.04em;
  line-height: 1.08;
}

.hero-section h1 span {
  color: #b2dbbf;
}

.hero-copy {
  max-width: 600px;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, .88);
  font-size: 18px;
}

.search-panel {
  display: flex;
  position: relative;
  max-width: 700px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, .24);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 20px 40px rgba(16, 42, 39, .2);
}

.search-panel input {
  width: 100%;
  min-width: 0;
  padding: 12px 12px 12px 44px;
  border: 0;
  outline: none;
}
</style>