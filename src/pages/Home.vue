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
            <span class="hero-eyebrow"><i class="bi bi-stars"></i> Smarter car shopping</span>
            <h1>Find the car that fits <span>your life.</span></h1>
            <p class="hero-copy">
              Explore quality cars, compare your options, and drive away with confidence.
            </p>

            <form class="search-panel" @submit.prevent="scrollToCars">
              <label class="visually-hidden" for="car-search">Search for a car</label>
              <i class="bi bi-search search-icon" aria-hidden="true"></i>
              <input
                id="car-search"
                v-model.trim="searchTerm"
                type="search"
                placeholder="Search by model, brand, or location"
              />
              <button type="submit" class="search-button">Search cars</button>
            </form>

            <div class="hero-actions">
              <RouterLink class="btn-primary-home" to="/cars">
                Browse all cars <i class="bi bi-arrow-up-right"></i>
              </RouterLink>
              <a class="hero-text-link" href="#featured-cars">Explore featured <i class="bi bi-arrow-down"></i></a>
            </div>
          </div>

          <div class="col-lg-4 d-none d-lg-block">
            <div class="hero-stat-card">
              <span class="stat-icon"><i class="bi bi-car-front-fill"></i></span>
              <p>Find your perfect match</p>
              <strong>{{ cars.length || '—' }} <small>cars to explore</small></strong>
              <div class="stat-line"><span></span></div>
              <div class="stat-foot"><i class="bi bi-shield-check"></i> Curated choices, clear details</div>
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
            <p>Discover vehicles selected to make your next move easier.</p>
          </div>
          <RouterLink class="all-cars-link d-none d-sm-inline-flex" to="/cars">
            View all cars <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>

        <div class="filter-bar" aria-label="Car filters">
          <div class="filter-control filter-search">
            <i class="bi bi-search" aria-hidden="true"></i>
            <label class="visually-hidden" for="featured-search">Search featured cars</label>
            <input id="featured-search" v-model.trim="searchTerm" type="search" placeholder="Search cars" />
          </div>
          <div class="filter-control">
            <label class="visually-hidden" for="brand-filter">Brand</label>
            <select id="brand-filter" v-model="selectedBrand">
              <option value="">All brands</option>
              <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>
          <div class="filter-control">
            <label class="visually-hidden" for="location-filter">Location</label>
            <select id="location-filter" v-model="selectedLocation">
              <option value="">All locations</option>
              <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
            </select>
          </div>
          <div class="filter-control">
            <label class="visually-hidden" for="price-filter">Maximum price</label>
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
            <div class="car-skeleton"><div></div><span></span><span></span><span></span></div>
          </div>
        </div>

        <div v-else-if="errorMessage" class="feedback-card error-card" role="alert">
          <span class="feedback-icon"><i class="bi bi-wifi-off"></i></span>
          <div>
            <h3>We couldn’t load the cars</h3>
            <p>{{ errorMessage }}</p>
          </div>
          <button class="retry-button" type="button" @click="fetchCars"><i class="bi bi-arrow-clockwise"></i> Try Again</button>
        </div>

        <div v-else-if="filteredCars.length" class="row g-4">
          <article v-for="car in filteredCars" :key="car.id" class="col-12 col-md-6 col-lg-4">
            <div class="car-card">
              <div class="car-image-wrap">
                <img :src="car.image" :alt="car.name" class="car-image" />
                <span class="match-badge"><i class="bi bi-stars"></i> {{ car.match }}% Match</span>
              </div>
              <div class="car-card-body">
                <div class="car-topline"><span>{{ car.brand }}</span><span>{{ car.year }}</span></div>
                <h3>{{ car.name }}</h3>
                <div class="car-specs">
                  <span><i class="bi bi-gear"></i>{{ car.transmission }}</span>
                  <span><i class="bi bi-geo-alt"></i>{{ car.location }}</span>
                </div>
                <div class="car-footer">
                  <div><small>Starting from</small><strong>{{ formatPrice(car.price) }}</strong></div>
                  <RouterLink class="details-link" :to="`/cars/${car.id}`" :aria-label="`View details for ${car.name}`">
                    Details <i class="bi bi-arrow-right"></i>
                  </RouterLink>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="feedback-card empty-card">
          <span class="feedback-icon"><i class="bi bi-car-front"></i></span>
          <div>
            <h3>No cars found</h3>
            <p>Try changing your search or removing one of the filters.</p>
          </div>
          <button class="retry-button" type="button" @click="clearFilters">Clear filters</button>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div>
            <span class="section-kicker cta-kicker">Ready when you are</span>
            <h2>Have a car to sell?</h2>
            <p>Reach people who are actively looking for their next car on CarHub.</p>
          </div>
          <RouterLink class="cta-button" to="/seller-dashboard">List your car <i class="bi bi-arrow-up-right"></i></RouterLink>
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

const brands = computed(() => [...new Set(cars.value.map((car) => car.brand).filter(Boolean))].sort())
const locations = computed(() => [...new Set(cars.value.map((car) => car.location).filter(Boolean))].sort())

const filteredCars = computed(() => {
  const query = searchTerm.value.toLocaleLowerCase()
  const priceLimit = Number(maxPrice.value)

  return cars.value.filter((car) => {
    const searchableText = [car.name, car.brand, car.location].filter(Boolean).join(' ').toLocaleLowerCase()
    const matchesQuery = !query || searchableText.includes(query)
    const matchesBrand = !selectedBrand.value || car.brand === selectedBrand.value
    const matchesLocation = !selectedLocation.value || car.location === selectedLocation.value
    const matchesPrice = !priceLimit || Number(car.price) <= priceLimit

    return matchesQuery && matchesBrand && matchesLocation && matchesPrice
  })
})

const hasActiveFilters = computed(() => Boolean(searchTerm.value || selectedBrand.value || selectedLocation.value || maxPrice.value))

async function fetchCars() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`The car service returned ${response.status}.`)

    const data = await response.json()
    if (!Array.isArray(data)) throw new Error('The car service returned an unexpected response.')

    cars.value = data
  } catch (error) {
    cars.value = []
    errorMessage.value = error instanceof Error ? error.message : 'Please check your connection and try again.'
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
  document.getElementById('featured-cars')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function formatPrice(price) {
  return `${new Intl.NumberFormat('en-US').format(Number(price) || 0)} EGP`
}

onMounted(fetchCars)
</script>

<style scoped>
.home-page { overflow: hidden; background: #f7fff7; color: #102a27; }
.hero-section { position: relative; isolation: isolate; overflow: hidden; padding: 96px 0 88px; background: linear-gradient(125deg, #102a27 0%, #1f6f5b 50%, #70c1b3 100%); }
.hero-section::after { position: absolute; z-index: -1; inset: 0; content: ''; background: linear-gradient(45deg, rgba(16,42,39,.25), transparent 50%, rgba(247,255,247,.2)); }
.hero-orb { position: absolute; z-index: -1; border-radius: 50%; filter: blur(3px); }
.hero-orb-one { top: -180px; right: -70px; width: 480px; height: 480px; background: rgba(178,219,191,.27); }
.hero-orb-two { right: 24%; bottom: -180px; width: 280px; height: 280px; border: 1px solid rgba(247,255,247,.24); }
.hero-content { min-height: 420px; }
.hero-eyebrow, .section-kicker { display: inline-flex; gap: 8px; align-items: center; color: #b2dbbf; font-size: 14px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
.hero-section h1 { max-width: 760px; margin: 16px 0; color: #fff; font-size: clamp(40px, 5vw, 64px); font-weight: 750; letter-spacing: -.04em; line-height: 1.08; }
.hero-section h1 span { color: #b2dbbf; }
.hero-copy { max-width: 600px; margin-bottom: 32px; color: rgba(255,255,255,.88); font-size: 18px; }
.search-panel { display: flex; position: relative; max-width: 700px; padding: 8px; border: 1px solid rgba(255,255,255,.24); border-radius: 16px; background: #fff; box-shadow: 0 20px 40px rgba(16,42,39,.2); }
.search-panel input { width: 100%; min-width: 0; padding: 12px 12px 12px 44px; border: 0; outline: 0; color: #102a27; font: inherit; }
.search-icon { position: absolute; top: 23px; left: 22px; color: #1f6f5b; }
.search-button, .retry-button, .cta-button, .btn-primary-home { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; border-radius: 10px; background: #1f6f5b; color: #fff; font-weight: 700; text-decoration: none; transition: transform .2s ease, background .2s ease; }
.search-button { flex: 0 0 auto; padding: 12px 20px; }
.search-button:hover, .retry-button:hover, .cta-button:hover, .btn-primary-home:hover { transform: translateY(-2px); background: #102a27; color: #fff; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 24px; align-items: center; margin-top: 24px; }
.btn-primary-home { padding: 12px 24px; background: #fff; color: #102a27; }
.hero-text-link { color: #fff; font-weight: 700; text-decoration: none; }
.hero-text-link:hover { color: #b2dbbf; }
.hero-stat-card { padding: 28px; border: 1px solid rgba(255,255,255,.25); border-radius: 20px; background: rgba(16,42,39,.28); box-shadow: 0 20px 50px rgba(16,42,39,.15); backdrop-filter: blur(10px); color: #fff; }
.stat-icon, .feedback-icon { display: inline-grid; width: 48px; height: 48px; place-items: center; border-radius: 14px; background: #b2dbbf; color: #102a27; font-size: 22px; }
.hero-stat-card p { margin: 24px 0 4px; color: rgba(255,255,255,.72); font-size: 14px; }.hero-stat-card strong { font-size: 32px; }.hero-stat-card strong small { font-size: 14px; font-weight: 500; }.stat-line { height: 5px; margin: 20px 0 12px; border-radius: 20px; background: rgba(255,255,255,.25); }.stat-line span { display: block; width: 75%; height: 100%; border-radius: inherit; background: #b2dbbf; }.stat-foot { color: #b2dbbf; font-size: 13px; }
.featured-section { padding: 80px 0; }.section-heading { display: flex; justify-content: space-between; gap: 24px; align-items: end; margin-bottom: 32px; }.section-heading h2, .cta-card h2 { margin: 8px 0; font-size: clamp(30px, 3vw, 40px); letter-spacing: -.03em; }.section-heading p, .cta-card p { margin: 0; color: #54716a; }.all-cars-link { gap: 8px; align-items: center; padding-bottom: 8px; color: #1f6f5b; font-weight: 700; text-decoration: none; }.all-cars-link:hover { color: #102a27; }
.filter-bar { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 32px; }.filter-control { display: flex; align-items: center; min-width: 160px; border: 1px solid #b2dbbf; border-radius: 10px; background: #fff; }.filter-search { flex: 1 1 230px; }.filter-control i { margin-left: 14px; color: #1f6f5b; }.filter-control input, .filter-control select { width: 100%; padding: 12px; border: 0; outline: 0; background: transparent; color: #102a27; font: inherit; }.clear-filters { border: 0; background: transparent; color: #1f6f5b; font-weight: 700; }
.car-card { height: 100%; overflow: hidden; border: 1px solid rgba(178,219,191,.8); border-radius: 16px; background: #fff; box-shadow: 0 4px 15px rgba(16,42,39,.1); transition: transform .25s ease, box-shadow .25s ease; }.car-card:hover { transform: translateY(-6px); box-shadow: 0 14px 28px rgba(16,42,39,.16); }.car-image-wrap { position: relative; height: 230px; background: #b2dbbf; }.car-image { width: 100%; height: 100%; object-fit: cover; }.match-badge { position: absolute; top: 12px; right: 12px; display: inline-flex; gap: 5px; align-items: center; padding: 6px 10px; border-radius: 20px; background: rgba(16,42,39,.9); color: #fff; font-size: 12px; font-weight: 700; }.car-card-body { padding: 20px; }.car-topline { display: flex; justify-content: space-between; color: #1f6f5b; font-size: 14px; font-weight: 700; }.car-topline span:last-child { color: #668078; }.car-card h3 { overflow: hidden; margin: 8px 0 16px; color: #102a27; font-size: 20px; text-overflow: ellipsis; white-space: nowrap; }.car-specs { display: flex; flex-wrap: wrap; gap: 12px; color: #54716a; font-size: 13px; }.car-specs span { display: inline-flex; gap: 5px; align-items: center; }.car-specs i { color: #1f6f5b; }.car-footer { display: flex; justify-content: space-between; gap: 12px; align-items: end; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e3f1e6; }.car-footer small { display: block; color: #668078; font-size: 12px; }.car-footer strong { color: #102a27; font-size: 17px; }.details-link { display: inline-flex; gap: 6px; align-items: center; color: #1f6f5b; font-size: 14px; font-weight: 700; text-decoration: none; }.details-link:hover { color: #102a27; }
.feedback-card { display: flex; gap: 20px; align-items: center; justify-content: center; min-height: 230px; padding: 32px; border: 1px solid #b2dbbf; border-radius: 16px; background: #fff; text-align: left; }.feedback-card h3 { margin: 0 0 4px; font-size: 20px; }.feedback-card p { margin: 0; color: #54716a; }.error-card { border-color: #70c1b3; }.retry-button { margin-left: 8px; padding: 12px 18px; white-space: nowrap; }.car-skeleton { overflow: hidden; padding: 20px; border-radius: 16px; background: #fff; box-shadow: 0 4px 15px rgba(16,42,39,.08); }.car-skeleton div, .car-skeleton span { display: block; margin-bottom: 16px; border-radius: 8px; background: linear-gradient(90deg, #edf7ef 25%, #dcefe2 50%, #edf7ef 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }.car-skeleton div { height: 200px; }.car-skeleton span { height: 18px; }.car-skeleton span:nth-child(3) { width: 70%; }.car-skeleton span:last-child { width: 42%; }@keyframes shimmer { to { background-position: -200% 0; } }
.cta-section { padding: 0 0 80px; }.cta-card { display: flex; justify-content: space-between; gap: 32px; align-items: center; padding: 48px; border-radius: 20px; background: linear-gradient(135deg, #102a27, #1f6f5b); }.cta-card h2 { color: #fff; }.cta-card p { max-width: 560px; color: #dceddf; }.cta-kicker { color: #b2dbbf; }.cta-button { flex: 0 0 auto; padding: 14px 24px; background: #b2dbbf; color: #102a27; }.cta-button:hover { background: #fff; color: #102a27; }
@media (max-width: 767.98px) { .hero-section { padding: 64px 0; }.hero-copy { font-size: 16px; }.search-panel { display: block; padding: 4px; }.search-panel input { padding: 14px 14px 14px 44px; }.search-icon { top: 19px; }.search-button { width: 100%; margin-top: 4px; }.section-heading, .cta-card { align-items: flex-start; flex-direction: column; }.featured-section { padding: 56px 0; }.filter-control, .filter-search { flex: 1 1 100%; }.feedback-card { align-items: flex-start; flex-direction: column; justify-content: center; }.retry-button { margin-left: 0; }.cta-section { padding-bottom: 56px; }.cta-card { padding: 32px; }.cta-button { width: 100%; }.hero-actions { gap: 16px; }.car-image-wrap { height: 215px; } }
</style>
