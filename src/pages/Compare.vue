<template>
  <div>
    <Navbar />

    <div class="compare-page container my-5">

      <div class="text-center mb-5">
        <h1 class="main-title">Compare Cars</h1>

        <p class="text-muted fs-6">
          Compare technical specifications and prices side by side
          to choose the right car for you
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">
            Loading...
          </span>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="errorMessage" class="alert alert-danger text-center">
        {{ errorMessage }}
      </div>

      <!-- No Cars -->
      <div v-else-if="compareCars.length === 0" class="alert alert-warning text-center">
        No cars available for comparison.
      </div>

      <!-- Comparison -->
      <div v-else class="carhub-card large-container">
        <div class="table-responsive">

          <table class="table table-borderless align-middle text-center mb-0">

            <thead>
              <tr>
                <th>Specification</th>

                <th v-for="car in compareCars" :key="car.id">
                  <img :src="car.image" :alt="car.name" class="compare-image" @error="handleImageError" />

                  <h5 class="mt-3">
                    {{ car.name }}
                  </h5>

                  <button class="btn btn-sm btn-outline-danger" type="button" @click="removeCar(car.id)">
                    Remove
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td><strong>Price</strong></td>

                <td v-for="car in compareCars" :key="price - `${car.id}">
                  {{ formatPrice(car.price) }}
                </td>
              </tr>

              <tr>
                <td><strong>Year</strong></td>

                <td v-for="car in compareCars" :key="year - ${ car.id }">
                  {{ car.year }}
                </td>
              </tr>

              <tr>
                <td><strong>Brand</strong></td>

                <td v-for="car in compareCars" :key="brand - ${ car.id }">
                  {{ car.brand }}
                </td>
              </tr>

              <tr>
                <td><strong>Fuel</strong></td>

                <td v-for="car in compareCars" :key="fuel - ${ car.id }">
                  {{ car.fuel }}
                </td>
              </tr>

              <tr>
                <td><strong>Transmission</strong></td>

                <td v-for="car in compareCars" :key="transmission - ${ car.id }">
                  {{ car.transmission }}
                </td>
              </tr>

              <tr>
                <td><strong>Mileage</strong></td>

                <td v-for="car in compareCars" :key="mileage - ${ car.id }">
                  {{ car.mileage }} km
                </td>
              </tr>

              <tr>
                <td><strong>Color</strong></td>

                <td v-for="car in compareCars" :key="color - ${ car.id }">
                  {{ car.color }}
                </td>
              </tr>
              <tr>
                <td><strong>Location</strong></td>
                <td v-for="car in compareCars" :key="location - ${ car.id }">
                  {{ car.location }}
                </td>
              </tr>

            </tbody>

          </table>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue'

const API_URL = 'http://localhost:3000/cars'

const compareCars = ref([])
const loading = ref(true)
const errorMessage = ref('')

async function fetchCompareCars() {
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

    compareCars.value = data.slice(0, 2)

  } catch (error) {
    compareCars.value = []

    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Unable to load cars.'
  } finally {
    loading.value = false
  }
}

function removeCar(id) {
  if (compareCars.value.length <= 1) {
    alert('At least one car must remain in the comparison.')
    return
  }

  compareCars.value =
    compareCars.value.filter(
      (car) => car.id !== id
    )
}

function handleImageError(event) {
  event.target.src =
    'https://via.placeholder.com/400x250?text=Car+Image'
}

function formatPrice(price) {
  return `${new Intl.NumberFormat('en-US').format(
    Number(price) || 0
  )} EGP`
}

onMounted(fetchCompareCars)
</script>

<style scoped>
.compare-page {
  padding: 64px 0;
}

.main-title {
  font-size: 48px;
  color: #1f6f5b;
  font-weight: bold;
}

.carhub-card.large-container {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(16, 42, 39, 0.08);
}

.compare-image {
  width: 180px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
}

.table th,
.table td {
  min-width: 180px;
  padding: 20px;
}

.table tbody tr {
  border-bottom: 1px solid #eeeeee;
}

.table tbody td:first-child {
  color: #1f6f5b;
}

@media (max-width: 768px) {
  .compare-page {
    padding: 40px 0;
  }

  .main-title {
    font-size: 36px;
  }

  .compare-image {
    width: 140px;
    height: 95px;
  }
}
</style>