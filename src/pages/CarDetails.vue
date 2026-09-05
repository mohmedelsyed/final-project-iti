<template>
  <section class="details-page">
    <div class="container">

      <button class="back-btn" @click="goBack">
        <i class="bi bi-arrow-left"></i>
        Back to Cars
      </button>

      <div v-if="loading" class="loading">
        <i class="bi bi-arrow-repeat"></i>
        <p>Loading car details...</p>
      </div>

      <div v-else-if="car" class="car-details">

        <div class="car-image">
          <img
            :src="car.image"
            :alt="car.name"
          />

          <span class="match">
            {{ car.match }}% Match
          </span>
        </div>

        <div class="details-content">

          <span class="brand">
            {{ car.brand }}
          </span>

          <h1>{{ car.name }}</h1>

          <p class="year">
            {{ car.year }}
          </p>

          <div class="price">
            {{ car.price.toLocaleString() }}
            <span>EGP</span>
          </div>

          <h2>Specifications</h2>

          <div class="row g-3">

            <div class="col-md-4">
              <div class="spec">
                <i class="bi bi-calendar"></i>
                <span>Year</span>
                <strong>{{ car.year }}</strong>
              </div>
            </div>

            <div class="col-md-4">
              <div class="spec">
                <i class="bi bi-fuel-pump"></i>
                <span>Fuel</span>
                <strong>{{ car.fuel }}</strong>
              </div>
            </div>

            <div class="col-md-4">
              <div class="spec">
                <i class="bi bi-speedometer2"></i>
                <span>Mileage</span>
                <strong>
                  {{ car.mileage.toLocaleString() }} km
                </strong>
              </div>
            </div>

            <div class="col-md-4">
              <div class="spec">
                <i class="bi bi-gear"></i>
                <span>Transmission</span>
                <strong>{{ car.transmission }}</strong>
              </div>
            </div>

            <div class="col-md-4">
              <div class="spec">
                <i class="bi bi-palette"></i>
                <span>Color</span>
                <strong>{{ car.color }}</strong>
              </div>
            </div>

            <div class="col-md-4">
              <div class="spec">
                <i class="bi bi-geo-alt"></i>
                <span>Location</span>
                <strong>{{ car.location }}</strong>
              </div>
            </div>

          </div>

          <div class="location">
            <i class="bi bi-geo-alt"></i>
            <span>
              Location: {{ car.location }}, Egypt
            </span>
          </div>

          <div class="actions">

            <button
              class="contact-btn"
              @click="contactSeller"
            >
              Contact Seller
            </button>

            <button
              class="favorite-btn"
              @click="toggleFavorite"
            >
              <i
                :class="car.isFavorite
                  ? 'bi bi-heart-fill'
                  : 'bi bi-heart'"
              ></i>

              {{ car.isFavorite ? 'Saved' : 'Favorite' }}
            </button>

          </div>

        </div>

      </div>

      <div v-else class="no-results">
        <i class="bi bi-car-front"></i>
        <h3>Car not found</h3>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const car = ref(null)
const loading = ref(true)

async function getCar() {
  try {

    const response = await fetch(
      'http://localhost:3000/cars/1'
    )

    car.value = await response.json()

    car.value.isFavorite = false

  } catch (error) {

    console.error(
      'Error loading car:',
      error
    )

  } finally {

    loading.value = false
  }
}

function toggleFavorite() {
  car.value.isFavorite = !car.value.isFavorite
}

function contactSeller() {
  alert('Seller contact information will be available soon.')
}
function goBack() {
  window.history.back()
}

onMounted(() => {
  getCar()
})
</script>

<style scoped>

.details-page {
  min-height: 100vh;
  padding: 64px 0;
  background: #F7FFF7;
  color: #102A27;
}

.back-btn {
  border: none;
  background: none;
  color: #1F6F5B;
  font-weight: 600;
  margin-bottom: 24px;
}

.back-btn i {
  margin-right: 6px;
}

.car-details {
  overflow: hidden;
  background: white;
  border: 1px solid #B2DBBF;
  border-radius: 20px;
}

.car-image {
  height: 380px;
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
  top: 20px;
  right: 20px;
  padding: 6px 12px;
  border-radius: 10px;
  background: #102A27;
  color: white;
  font-size: 14px;
}

.details-content {
  padding: 32px;
}

.brand {
  color: #1F6F5B;
  font-weight: 700;
}

.details-content h1 {
  font-size: 32px;
  margin: 6px 0;
}

.year {
  color: #777;
}

.price {
  margin: 20px 0 30px;
  font-size: 28px;
  font-weight: 800;
}

.price span {
  color: #1F6F5B;
  font-size: 14px;
}

.details-content h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.spec {
  height: 100%;
  padding: 16px;
  border-radius: 12px;
  background: #F7FFF7;
}

.spec i {
  display: block;
  color: #1F6F5B;
  font-size: 22px;
  margin-bottom: 8px;
}

.spec span {
  display: block;
  color: #777;
  font-size: 14px;
}

.spec strong {
  display: block;
  margin-top: 4px;
}

.location {
  margin: 24px 0;
  padding: 14px;
  border-radius: 12px;
  background: #F7FFF7;
}

.location i {
  color: #1F6F5B;
  margin-right: 8px;
}

.actions {
  display: flex;
  gap: 12px;
}

.contact-btn,
.favorite-btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
}

.contact-btn {
  border: none;
  background: #1F6F5B;
  color: white;
}

.favorite-btn {
  border: 1px solid #1F6F5B;
  background: white;
  color: #1F6F5B;
}

.contact-btn:hover {
  background: #102A27;
}

.favorite-btn:hover {
  background: #F7FFF7;
}

.loading,
.no-results {
  padding: 60px;
  text-align: center;
}

.loading i,
.no-results i {
  font-size: 45px;
  color: #1F6F5B;
}

@media (max-width: 768px) {

  .details-page {
    padding: 40px 0;
  }

  .car-image {
    height: 240px;
  }

  .details-content {
    padding: 20px;
  }

  .details-content h1 {
    font-size: 26px;
  }

  .actions {
    flex-direction: column;
  }

}

</style>