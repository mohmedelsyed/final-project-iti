<template>
  <section class="cars-page">
    <div class="container">

      <!-- Header -->
      <div class="page-header">
        <h1>Browse Cars</h1>
        <p>Find the perfect car for you</p>
      </div>

      <!-- Search & Filters -->
      <div class="filters">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input
            v-model="search"
            type="text"
            placeholder="Search by brand or model..."
          />
        </div>

        <select v-model="selectedBrand">
          <option value="all">All Brands</option>
          <option v-for="brand in brands" :key="brand">
            {{ brand }}
          </option>
        </select>

        <select v-model="selectedCondition">
          <option value="all">All Conditions</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>

        <button @click="resetFilters">Reset</button>
      </div>

      <!-- Results -->
      <div class="results-header">
        <h2>Available Cars</h2>
        <span>{{ filteredCars.length }} cars</span>
      </div>

      <!-- Cars -->
      <div class="row g-4">
        <div
          v-for="car in filteredCars"
          :key="car.id"
          class="col-lg-4 col-md-6"
        >
          <div class="car-card">

            <div
              class="car-image"
              :style="{ backgroundColor: car.bgColor }"
            >
              <span class="condition">
                {{ car.condition === 'new' ? 'New' : 'Used' }}
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

              <div class="car-icon">
                {{ car.icon }}
              </div>
            </div>

            <div class="card-content">
              <div class="car-info">
                <span>{{ car.make }}</span>
                <small>{{ car.year }}</small>
              </div>

              <h3>{{ car.title }}</h3>

              <div class="specs">
                <span>
                  <i class="bi bi-speedometer2"></i>
                  {{ car.mileage }}
                </span>

                <span>
                  <i class="bi bi-gear"></i>
                  {{ car.transmission }}
                </span>

                <span>
                  <i class="bi bi-fuel-pump"></i>
                  {{ car.fuel }}
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

                <button class="details-btn" @click="showDetails(car)">
                  Details
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredCars.length === 0" class="no-results">
        <i class="bi bi-car-front"></i>
        <h3>No cars found</h3>
        <p>Try another search or filter.</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedBrand = ref('all')
const selectedCondition = ref('all')

const cars = ref([
  {
    id: 1,
    title: 'Mercedes-Benz E200 AMG',
    make: 'Mercedes-Benz',
    year: 2024,
    price: 4250000,
    mileage: '0 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    condition: 'new',
    bgColor: '#B2DBBF',
    icon: '🏎️',
    isFavorite: false
  },
  {
    id: 2,
    title: 'BMW X5 M50i',
    make: 'BMW',
    year: 2023,
    price: 5600000,
    mileage: '15,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    condition: 'used',
    bgColor: '#70C1B3',
    icon: '🚙',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Porsche Taycan GTS',
    make: 'Porsche',
    year: 2024,
    price: 6800000,
    mileage: '0 km',
    transmission: 'Automatic',
    fuel: 'Electric',
    condition: 'new',
    bgColor: '#B2DBBF',
    icon: '⚡',
    isFavorite: false
  },
  {
    id: 4,
    title: 'Audi A6 S-Line',
    make: 'Audi',
    year: 2022,
    price: 3100000,
    mileage: '32,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    condition: 'used',
    bgColor: '#70C1B3',
    icon: '🚘',
    isFavorite: false
  },
  {
    id: 5,
    title: 'Toyota Land Cruiser VXR',
    make: 'Toyota',
    year: 2023,
    price: 5200000,
    mileage: '10,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    condition: 'used',
    bgColor: '#B2DBBF',
    icon: '🛻',
    isFavorite: false
  },
  {
    id: 6,
    title: 'Tesla Model Y',
    make: 'Tesla',
    year: 2024,
    price: 3900000,
    mileage: '0 km',
    transmission: 'Automatic',
    fuel: 'Electric',
    condition: 'new',
    bgColor: '#70C1B3',
    icon: '🔋',
    isFavorite: false
  }
])

const brands = computed(() => {
  return [...new Set(cars.value.map(car => car.make))]
})

const filteredCars = computed(() => {
  return cars.value.filter(car => {
    const text = search.value.toLowerCase()

    const searchMatch =
      car.title.toLowerCase().includes(text) ||
      car.make.toLowerCase().includes(text)

    const brandMatch =
      selectedBrand.value === 'all' ||
      car.make === selectedBrand.value

    const conditionMatch =
      selectedCondition.value === 'all' ||
      car.condition === selectedCondition.value

    return searchMatch && brandMatch && conditionMatch
  })
})

function toggleFavorite(car) {
  car.isFavorite = !car.isFavorite
}

function resetFilters() {
  search.value = ''
  selectedBrand.value = 'all'
  selectedCondition.value = 'all'
}

function showDetails(car) {
  console.log('Selected car:', car)
}
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
  margin-bottom: 40px;
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

.filters {
  display: flex;
  gap: 12px;
  padding: 20px;
  margin-bottom: 40px;
  background: white;
  border: 1px solid #B2DBBF;
  border-radius: 16px;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-box i {
  position: absolute;
  left: 14px;
  top: 13px;
  color: #1F6F5B;
}

.search-box input,
.filters select {
  width: 100%;
  height: 44px;
  padding: 8px 12px;
  border: 1px solid #B2DBBF;
  border-radius: 10px;
  outline: none;
  font-family: inherit;
}

.search-box input {
  padding-left: 40px;
}

.filters button {
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: 10px;
  background: #102A27;
  color: white;
  font-weight: 600;
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
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.car-icon {
  font-size: 75px;
}

.condition {
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
  gap: 10px;
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

.no-results {
  padding: 50px;
  text-align: center;
}

.no-results i {
  font-size: 45px;
  color: #1F6F5B;
}

@media (max-width: 768px) {
  .cars-page {
    padding: 40px 0;
  }

  .page-header h1 {
    font-size: 36px;
  }

  .filters {
    flex-direction: column;
  }

  .results-header h2 {
    font-size: 24px;
  }
}
</style>