```vue
<template>
  <div class="details-page-wrapper">

    <Navbar />

    <section class="details-page">

      <div class="container">

        <!-- Back Button -->
        <button class="back-btn" @click="goBack">
          <i class="bi bi-arrow-left"></i>
          Back to Cars
        </button>


        <!-- Loading -->
        <div v-if="loading" class="loading">

          <i class="bi bi-arrow-repeat"></i>

          <p>Loading car details...</p>

        </div>


        <!-- Car Details -->
        <div v-else-if="car" class="car-details">

          <!-- Car Image -->
          <div class="car-image">

            <img
              :src="car.image"
              :alt="car.name"
            />

            <span class="match">
              {{ car.match || 95 }}% Match
            </span>

          </div>


          <!-- Details Content -->
          <div class="details-content">

            <span class="brand">
              {{ car.brand }}
            </span>

            <h1>
              {{ car.name }}
            </h1>

            <p class="year">
              Model: {{ car.year }}
            </p>


            <!-- Price -->
            <div class="price">

              {{ (car.price || 0).toLocaleString() }}

              <span>EGP</span>

            </div>


            <!-- Specifications -->
            <h2>
              Specifications
            </h2>


            <div class="row g-3">

              <!-- Year -->
              <div class="col-md-4">

                <div class="spec">

                  <i class="bi bi-calendar"></i>

                  <span>
                    Year
                  </span>

                  <strong>
                    {{ car.year }}
                  </strong>

                </div>

              </div>


              <!-- Fuel -->
              <div class="col-md-4">

                <div class="spec">

                  <i class="bi bi-fuel-pump"></i>

                  <span>
                    Fuel
                  </span>

                  <strong>
                    {{ car.fuel || 'Petrol' }}
                  </strong>

                </div>

              </div>


              <!-- Mileage -->
              <div class="col-md-4">

                <div class="spec">

                  <i class="bi bi-speedometer2"></i>

                  <span>
                    Mileage
                  </span>

                  <strong>
                    {{ (car.mileage || 25000).toLocaleString() }} km
                  </strong>

                </div>

              </div>


              <!-- Transmission -->
              <div class="col-md-4">

                <div class="spec">

                  <i class="bi bi-gear"></i>

                  <span>
                    Transmission
                  </span>

                  <strong>
                    {{ car.transmission || 'Automatic' }}
                  </strong>

                </div>

              </div>


              <!-- Color -->
              <div class="col-md-4">

                <div class="spec">

                  <i class="bi bi-palette"></i>

                  <span>
                    Color
                  </span>

                  <strong>
                    {{ car.color || 'Dark Metallic' }}
                  </strong>

                </div>

              </div>


              <!-- Location -->
              <div class="col-md-4">

                <div class="spec">

                  <i class="bi bi-geo-alt"></i>

                  <span>
                    Location
                  </span>

                  <strong>
                    {{ car.location || 'Cairo' }}
                  </strong>

                </div>

              </div>

            </div>


            <!-- Location -->
            <div class="location">

              <i class="bi bi-geo-alt"></i>

              <span>
                Location:
                {{ car.location || 'Cairo' }},
                Egypt
              </span>

            </div>


            <!-- Actions -->
            <div class="actions">

              <button
                class="contact-btn"
                @click="contactSeller"
              >

                <i class="bi bi-telephone"></i>

                Contact Seller

              </button>


              <button
                class="favorite-btn"
                @click="toggleFavorite"
              >

                <i
                  :class="
                    car.isFavorite
                      ? 'bi bi-heart-fill'
                      : 'bi bi-heart'
                  "
                ></i>

                {{ car.isFavorite ? 'Saved' : 'Favorite' }}

              </button>

            </div>

          </div>

        </div>


        <!-- No Car -->
        <div v-else class="no-results">

          <i class="bi bi-car-front"></i>

          <h3>
            Car not found
          </h3>

          <button
            class="btn btn-outline-success mt-3"
            @click="goBack"
          >
            Browse all cars
          </button>

        </div>

      </div>

    </section>


    <FooterSection />

  </div>
</template>


<script setup>

import { ref, onMounted } from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import Navbar from '../components/Navbar.vue'

import FooterSection from '../components/FooterSection.vue'


/* =========================================
   ROUTER
========================================= */

const route = useRoute()

const router = useRouter()


/* =========================================
   DATA
========================================= */

const car = ref(null)

const loading = ref(true)


/* =========================================
   GET CAR
========================================= */

async function getCar() {

  loading.value = true

  const id = route.params.id || 1


  try {

    let data = null


    /* ==============================
       JSON SERVER
    ============================== */

    try {

      const response = await fetch(
        `http://localhost:3000/cars/${id}`
      )


      if (response.ok) {

        data = await response.json()

      }

    } catch {

      // JSON Server is not running

    }


    /* ==============================
       FALLBACK TO DB.JSON
    ============================== */

    if (!data) {

      const fallback =
        await fetch('/db.json')


      if (fallback.ok) {

        const json =
          await fallback.json()


        data =
          (json.cars || [])
            .find(
              c =>
                String(c.id) ===
                String(id)
            )

      }

    }


    /* ==============================
       SET CAR
    ============================== */

    if (data) {

      car.value = {

        fuel: 'Petrol',

        mileage: 25000,

        color: 'Metallic',

        ...data,

        isFavorite: false

      }

    } else {

      car.value = null

    }


  } catch (error) {

    console.error(
      'Error loading car:',
      error
    )

    car.value = null

  } finally {

    loading.value = false

  }

}


/* =========================================
   FAVORITE
========================================= */

function toggleFavorite() {

  if (car.value) {

    car.value.isFavorite =
      !car.value.isFavorite

  }

}


/* =========================================
   CONTACT SELLER
========================================= */

function contactSeller() {

  alert(
    'Seller contact information: Contacting agent via +20 100 000 0000'
  )

}


/* =========================================
   BACK
========================================= */

function goBack() {

  router.push('/cars')

}


/* =========================================
   ON MOUNT
========================================= */

onMounted(() => {

  getCar()

})

</script>


<style scoped>

/* =========================================
   CARHUB DESIGN SYSTEM
========================================= */

:root {

  --dark: #102A27;

  --primary: #1F6F5B;

  --secondary: #70C1B3;

  --light: #B2DBBF;

  --background: #F7FFF7;

  --white: #ffffff;

  --gray: #6c757d;

}


/* =========================================
   PAGE
========================================= */

.details-page {

  min-height: 100vh;

  padding: 55px 0 70px;

  background:

    linear-gradient(
      135deg,
      #F7FFF7,
      #B2DBBF,
      #70C1B3
    );

  color: #102A27;

}


/* =========================================
   CONTAINER
========================================= */

.details-page .container {

  width: 100%;

  max-width: 1400px;

  margin: 0 auto;

  padding-left: 30px;

  padding-right: 30px;

}


/* =========================================
   BACK BUTTON
========================================= */

.back-btn {

  display: flex;

  align-items: center;

  gap: 7px;

  border: none;

  background: transparent;

  color: #1F6F5B;

  font-size: 14px;

  font-weight: 600;

  margin-bottom: 25px;

  padding: 8px 0;

  cursor: pointer;

  transition: 0.3s ease;

}


.back-btn:hover {

  color: #102A27;

  transform: translateX(-4px);

}


.back-btn i {

  font-size: 17px;

}


/* =========================================
   CAR DETAILS
   50% WIDTH
   LEFT SIDE
========================================= */

.car-details {
  width: 40%;
  height:20%;
  margin:auto;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #B2DBBF;
  border-radius: 20px;
  box-shadow:
    0 10px 30px
    rgba(16, 42, 39, 0.12);

  transition: 0.3s ease;

}


.car-details:hover {

  box-shadow:
    0 15px 40px
    rgba(16, 42, 39, 0.18);

}


/* =========================================
   CAR IMAGE
========================================= */

.car-image {

  width: 100%;

  height: 330px;

  position: relative;

  overflow: hidden;

  background: #B2DBBF;

}


.car-image img {

  width: 100%;

  height: 100%;

  display: block;

  object-fit: cover;

  transition: transform 0.5s ease;

}


.car-details:hover
.car-image img {

  transform: scale(1.04);

}


/* =========================================
   MATCH
========================================= */

.match {

  position: absolute;

  top: 18px;

  right: 18px;

  padding: 7px 13px;

  border-radius: 20px;

  background: #102A27;

  color: #ffffff;

  font-size: 12px;

  font-weight: 600;

  box-shadow:
    0 5px 15px
    rgba(16, 42, 39, 0.25);

}


/* =========================================
   DETAILS CONTENT
========================================= */

.details-content {

  padding: 25px;

}


.brand {

  display: inline-block;

  margin-bottom: 4px;

  color: #1F6F5B;

  font-size: 13px;

  font-weight: 700;

  text-transform: uppercase;

}


.details-content h1 {

  margin: 3px 0 5px;

  color: #102A27;

  font-size: 30px;

  font-weight: 800;

  line-height: 1.2;

}


.year {

  margin: 0;

  color: #6c757d;

  font-size: 13px;

}


/* =========================================
   PRICE
========================================= */

.price {

  margin: 18px 0 25px;

  color: #102A27;

  font-size: 27px;

  font-weight: 800;

}


.price span {

  margin-left: 5px;

  color: #1F6F5B;

  font-size: 13px;

  font-weight: 700;

}


/* =========================================
   SPECIFICATIONS
========================================= */

.details-content h2 {

  margin-bottom: 15px;

  color: #102A27;

  font-size: 20px;

  font-weight: 700;

}


.spec {

  height: 100%;

  padding: 13px;

  border-radius: 12px;

  background: #F7FFF7;

  border: 1px solid
    rgba(31, 111, 91, 0.10);

  transition: 0.3s ease;

}


.spec:hover {

  background: #B2DBBF;

  transform: translateY(-3px);

}


.spec i {

  display: block;

  margin-bottom: 6px;

  color: #1F6F5B;

  font-size: 20px;

}


.spec span {

  display: block;

  margin-bottom: 2px;

  color: #6c757d;

  font-size: 11px;

}


.spec strong {

  display: block;

  color: #102A27;

  font-size: 12px;

}


/* =========================================
   LOCATION
========================================= */

.location {

  display: flex;

  align-items: center;

  gap: 8px;

  margin: 20px 0;

  padding: 12px;

  border-radius: 10px;

  background: #F7FFF7;

  color: #102A27;

  font-size: 12px;

}


.location i {

  color: #1F6F5B;

  font-size: 15px;

}


/* =========================================
   ACTIONS
========================================= */

.actions {

  display: flex;

  gap: 10px;

}


.contact-btn,
.favorite-btn {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  padding: 10px 16px;

  border-radius: 10px;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s ease;

}


.contact-btn {

  border: none;

  background: #1F6F5B;

  color: #ffffff;

}


.contact-btn:hover {

  background: #102A27;

  transform: translateY(-2px);

}


.favorite-btn {

  border: 1px solid #1F6F5B;

  background: #ffffff;

  color: #1F6F5B;

}


.favorite-btn:hover {

  background: #F7FFF7;

  transform: translateY(-2px);

}


/* =========================================
   LOADING
========================================= */

.loading {

  width: 50%;

  margin-left: 0;

  margin-right: auto;

  padding: 80px 20px;

  text-align: center;

}


.loading i {

  display: block;

  color: #1F6F5B;

  font-size: 45px;

  animation: rotate 1s linear infinite;

}


.loading p {

  margin-top: 12px;

  color: #6c757d;

  font-size: 14px;

}


@keyframes rotate {

  from {

    transform: rotate(0deg);

  }

  to {

    transform: rotate(360deg);

  }

}


/* =========================================
   NO RESULTS
========================================= */

.no-results {

  width: 50%;

  margin-left: 0;

  margin-right: auto;

  padding: 70px 20px;

  text-align: center;

}


.no-results i {

  display: block;

  margin-bottom: 15px;

  color: #1F6F5B;

  font-size: 50px;

}


.no-results h3 {

  color: #102A27;

  font-size: 22px;

}


/* =========================================
   TABLET
========================================= */

@media (max-width: 991px) {

  .car-details {

    width: 70%;

  }


  .loading,
  .no-results {

    width: 70%;

  }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {

  .details-page {

    padding: 40px 0 50px;

  }


  .details-page .container {

    padding-left: 18px;

    padding-right: 18px;

  }


  .car-details {

    width: 100%;

  }


  .loading,
  .no-results {

    width: 100%;

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


  .price {

    font-size: 24px;

  }


  .actions {

    flex-direction: column;

  }


  .contact-btn,
  .favorite-btn {

    width: 100%;

  }

}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 480px) {

  .car-image {

    height: 210px;

  }


  .details-content h1 {

    font-size: 23px;

  }


  .details-content h2 {

    font-size: 18px;

  }

}

</style>
```

