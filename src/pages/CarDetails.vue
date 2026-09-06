```vue
<template>
  <div>
    <Navbar />

    <section class="details-page">
      <div class="container">

        <main class="details-page">
          <div class="container py-5">

            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border" role="status"></div>
              <p class="mt-3">Loading car details...</p>
            </div>

            <div v-else-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <div v-else-if="car" class="row g-4">

              <div class="col-lg-7">
                <img
                  :src="car.image"
                  :alt="car.name"
                  class="img-fluid rounded-4 w-100 car-details-image"
                />
              </div>

              <div class="col-lg-5">
                <div class="details-card">

                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <span class="text-muted">{{ car.brand }}</span>
                      <h1>{{ car.name }}</h1>
                    </div>

                    <button
                      class="btn btn-outline-success"
                      type="button"
                      @click="toggleFavorite"
                    >
                      <i
                        :class="
                          car.isFavorite
                            ? 'bi bi-heart-fill'
                            : 'bi bi-heart'
                        "
                      ></i>
                    </button>
                  </div>

                  <h2 class="price">
                    {{ formatPrice(car.price) }}
                  </h2>

                  <div class="row g-3 my-3">

                    <div class="col-6">
                      <strong>Year</strong>
                      <p>{{ car.year }}</p>
                    </div>

                    <div class="col-6">
                      <strong>Transmission</strong>
                      <p>{{ car.transmission }}</p>
                    </div>

                    <div class="col-6">
                      <strong>Fuel</strong>
                      <p>{{ car.fuel }}</p>
                    </div>

                    <div class="col-6">
                      <strong>Mileage</strong>
                      <p>{{ car.mileage }} km</p>
                    </div>

                    <div class="col-6">
                      <strong>Color</strong>
                      <p>{{ car.color }}</p>
                    </div>

                    <div class="col-6">
                      <strong>Location</strong>
                      <p>{{ car.location }}</p>
                    </div>

                  </div>

                  <button
                    class="btn btn-success w-100 mb-2"
                    type="button"
                    @click="contactSeller"
                  >
                    Contact Seller
                  </button>

                  <button
                    class="btn btn-outline-secondary w-100"
                    type="button"
                    @click="goBack"
                  >
                    <i class="bi bi-arrow-left"></i>
                    Back to cars
                  </button>

                </div>
              </div>

            </div>

            <div v-else class="no-results">
              <i class="bi bi-car-front"></i>
              <h3>Car not found</h3>
            </div>

          </div>
        </main>

      </div>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const route = useRoute()
const router = useRouter()

const car = ref(null)
const loading = ref(true)
const errorMessage = ref('')

async function getCar() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(
      `${API_URL}/${route.params.id}`
    )

    if (!response.ok) {
      throw new Error('Car not found.')
    }

    car.value = await response.json()
    car.value.isFavorite = false

  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Unable to load car details.'

  } finally {
    loading.value = false
  }
}

function toggleFavorite() {
  if (car.value) {
    car.value.isFavorite = !car.value.isFavorite
  }
}

function contactSeller() {
  alert('Seller contact feature is coming soon.')
}

function goBack() {
  router.back()
}

function formatPrice(price) {
  return `${new Intl.NumberFormat('en-US').format(
    Number(price) || 0
  )} EGP`
}

onMounted(getCar)
</script>


<style scoped>
.details-page {
  min-height: 80vh;
  background: #f7fff7;
}

.car-details-image {
  min-height: 450px;
  object-fit: cover;
}

.details-card {
  padding: 30px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(16, 42, 39, 0.1);
}

.details-card h1 {
  margin: 5px 0 0;
  color: #102a27;
}

.price {
  margin-top: 25px;
  color: #1f6f5b;
}

.details-card strong {
  color: #102a27;
}

.details-card p {
  margin-top: 5px;
  color: #666;
}
</style>
```