<template>
  <div class="seller-dashboard-page">

    <Navbar />

    <div class="container py-5">

      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">

        <div>
          <h1 class="main-title">
            Seller Dashboard
          </h1>

          <p class="sub-title mb-0">
            Manage your listed cars and monitor your active ads
          </p>
        </div>

        <button class="btn-carhub-primary" @click="showAddModal = true">
          + Add New Car
        </button>

      </div>


      <!-- Stats -->
      <div class="row g-4 mb-5">

        <div class="col-12 col-md-4">

          <div class="carhub-card">

            <span class="text-muted small">
              Total Cars
            </span>

            <h3 class="fs-2 fw-bold text-dark my-1">
              {{ cars.length }}
            </h3>

            <span class="badge bg-light-carhub">
              Listed Cars
            </span>

          </div>

        </div>

      </div>


      <!-- Loading -->
      <div v-if="loading" class="text-center my-5">

        <div class="spinner-border text-success" role="status">

          <span class="visually-hidden">
            Loading...
          </span>

        </div>

      </div>


      <!-- Cars -->
      <div v-else>

        <h2 class="section-title mb-4">
          My Listings
        </h2>

        <div class="row g-4">

          <div v-for="car in cars" :key="car.id" class="col-12 col-md-6 col-lg-4">

            <div class="carhub-card h-100 d-flex flex-column justify-content-between">

              <div>

                <img :src="car.image" :alt="car.name || car.brand" class="car-img mb-3" @error="handleImageError" />

                <div class="d-flex justify-content-between align-items-center mb-2">

                  <h3 class="card-title mb-0">
                    {{ car.name || car.brand }}
                  </h3>

                  <span class="price-tag">
                    EGP {{ Number(car.price).toLocaleString() }}
                  </span>

                </div>

                <p class="text-muted small mb-3">
                  Brand: {{ car.brand }}
                  |
                  Year: {{ car.year }}
                  |
                  Location: {{ translateValue(car.location) }}
                </p>

              </div>


              <div class="d-flex gap-2 pt-3 border-top">

                <button class="btn-outline-carhub w-50" @click="editCar(car)">
                  Edit Price
                </button>

                <button class="btn-danger-carhub w-50" @click="deleteCar(car.id)">
                  Delete
                </button>

              </div>

            </div>

          </div>

        </div>


        <!-- No Cars -->
        <div v-if="cars.length === 0" class="alert alert-info mt-4">
          No cars have been listed yet.
        </div>

      </div>


      <!-- Add Car Modal -->
      <div v-if="showAddModal" class="modal-backdrop-custom" @click.self="showAddModal = false">

        <div class="carhub-card modal-content-custom">

          <div class="d-flex justify-content-between align-items-center mb-3">

            <h3 class="card-title">
              Add New Car
            </h3>

            <button type="button" class="btn-close" @click="showAddModal = false"></button>

          </div>


          <form @submit.prevent="addNewCar">

            <!-- Brand -->
            <div class="mb-3">
              <label class="form-label small fw-bold">
                Brand
              </label>

              <input v-model="newCar.brand" type="text" class="form-control custom-input" placeholder="e.g. BMW"
                required />

            </div>


            <!-- Name -->
            <div class="mb-3">

              <label class="form-label small fw-bold">
                Car Name & Model
              </label>

              <input v-model="newCar.name" type="text" class="form-control custom-input" placeholder="e.g. BMW 3 Series"
                required />

            </div>


            <!-- Price + Year -->
            <div class="row g-2 mb-3">

              <div class="col-6">

                <label class="form-label small">
                  Price (EGP)
                </label>

                <input v-model.number="newCar.price" type="number" class="form-control custom-input"
                  placeholder="1450000" min="1" required />

              </div>


              <div class="col-6">

                <label class="form-label small">
                  Year
                </label>

                <input v-model.number="newCar.year" type="number" class="form-control custom-input" placeholder="2024"
                  min="1900" required />

              </div>

            </div>


            <!-- Location -->
            <div class="mb-3">

              <label class="form-label small">
                City / Location
              </label>

              <input v-model="newCar.location" type="text" class="form-control custom-input" placeholder="Cairo"
                required />

            </div>


            <!-- Image -->
            <div class="mb-3">

              <label class="form-label small">
                Image URL
              </label>

              <input v-model="newCar.image" type="url" class="form-control custom-input" placeholder="https://..." />

            </div>


            <!-- Buttons -->
            <div class="d-flex gap-2 justify-content-end mt-4">

              <button type="button" class="btn-outline-carhub" @click="showAddModal = false">
                Cancel
              </button>

              <button type="submit" class="btn-carhub-primary" :disabled="saving">
                {{ saving ? 'Saving...' : 'Save Car' }}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  </div>
</template>


<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.vue'

const API_URL = 'http://localhost:3000'

export default {

  name: 'SellerDashboard',

  components: {
    Navbar
  },

  data() {

    return {

      showAddModal: false,

      loading: true,

      saving: false,

      cars: [],

      newCar: {

        brand: '',

        name: '',

        price: '',

        year: '',

        location: '',

        transmission: 'Automatic',

        fuel: 'Petrol',

        mileage: 0,

        color: 'Black',

        match: 95,

        image: ''

      }

    }

  },


  mounted() {

    this.fetchCars()

  },


  methods: {

    async fetchCars() {

      this.loading = true

      try {

        const response =
          await axios.get(`${API_URL}/cars`)
        this.cars = response.data

      } catch (error) {
        console.error(
          'Error fetching cars:',
          error
        )

        Swal.fire({
          icon: 'error',
          title: 'API Error',
          text:
            'Make sure JSON Server is running on port 3000.'
        })

      } finally {

        this.loading = false

      }

    },


    translateValue(value) {

      if (!value) {
        return 'Cairo'
      }

      const dictionary = {

        'القاهرة': 'Cairo',

        'الجيزة': 'Giza',

        'الإسكندرية': 'Alexandria',

        'أوتوماتيك': 'Automatic'

      }

      return dictionary[value] || value
    },


    async addNewCar() {

      this.saving = true

      if (!this.newCar.image) {

        this.newCar.image =
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=80'

      }

      const payload = {

        brand: this.newCar.brand,

        name: this.newCar.name,

        price: Number(this.newCar.price),

        year: Number(this.newCar.year),

        location: this.newCar.location,

        transmission:
          this.newCar.transmission,

        fuel:
          this.newCar.fuel,

        mileage:
          Number(this.newCar.mileage),

        color:
          this.newCar.color,

        match:
          Number(this.newCar.match),

        image:
          this.newCar.image

      }

      try {

        const response =
          await axios.post(
            `${API_URL}/cars`,
            payload
          )

        this.cars.push(response.data)

        this.showAddModal = false

        this.resetForm()

        await Swal.fire({
          title: 'Car Added!',
          text:
            'The car was added successfully.',
          icon: 'success',
          confirmButtonColor: '#1F6F5B'
        })

      } catch (error) {

        console.error(
          'Error adding car:',
          error
        )

        Swal.fire({
          icon: 'error',
          title: 'Could not add car',
          text:
            'Please make sure JSON Server is running.'
        })

      } finally {

        this.saving = false

      }

    },


    async deleteCar(id) {

      const result =
        await Swal.fire({

          title: 'Are you sure?',

          text:
            'This car will be permanently deleted.',

          icon: 'warning',

          showCancelButton: true,

          confirmButtonColor: '#102A27',

          cancelButtonColor: '#d33',

          confirmButtonText:
            'Yes, delete it',

          cancelButtonText:
            'Cancel'

        })


      if (!result.isConfirmed) {
        return
      }


      try {

        await axios.delete(
          `${API_URL}/cars/${id}`
        )

        this.cars =
          this.cars.filter(
            car => car.id !== id
          )

        await Swal.fire({
          title: 'Deleted!',
          text:
            'The car was deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#1F6F5B'
        })

      } catch (error) {

        console.error(
          'Error deleting car:',
          error
        )

        Swal.fire({
          icon: 'error',
          title: 'Delete failed',
          text:
            'Could not delete this car.'
        })

      }

    },


    async editCar(car) {

      const result =
        await Swal.fire({

          title: 'Update Price',

          input: 'number',

          inputValue: car.price,

          inputAttributes: {
            min: 1
          },

          showCancelButton: true,

          confirmButtonColor: '#1F6F5B',

          confirmButtonText: 'Save',

          cancelButtonText: 'Cancel',

          inputValidator(value) {

            if (
              !value ||
              Number(value) <= 0
            ) {
              return 'Please enter a valid price.'
            }

            return undefined

          }

        })


      if (
        !result.isConfirmed ||
        !result.value
      ) {

        return

      }


      const newPrice =
        Number(result.value)


      try {
        await axios.patch(
          `${API_URL}/cars/${car.id}`, {
          price: newPrice
        }
        )

        car.price = newPrice

        await Swal.fire({
          title: 'Updated!',
          text:
            'The price was updated successfully.',
          icon: 'success',
          confirmButtonColor: '#1F6F5B'
        })

      } catch (error) {

        console.error(
          'Error updating price:',
          error
        )

        Swal.fire({
          icon: 'error',
          title: 'Update failed',
          text:
            'Could not update the car price.'
        })

      }

    },


    resetForm() {

      this.newCar = {

        brand: '',

        name: '',

        price: '',

        year: '',

        location: '',

        transmission: 'Automatic',

        fuel: 'Petrol',

        mileage: 0,

        color: 'Black',

        match: 95,

        image: ''

      }

    },


    handleImageError(event) {

      event.target.src =
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=80'

    }

  }

}
</script>


<style scoped>
.seller-dashboard-page {
  direction: ltr;
  text-align: left;
  width: 100%;
  min-height: 100vh;
  background: #f7fff7;
}

.main-title {
  font-size: 32px;
  color: #102A27;
  font-weight: 800;
}

.sub-title {
  color: #6c757d;
  font-size: 15px;
}

.section-title {
  font-size: 24px;
  color: #102A27;
  font-weight: 700;
}

.carhub-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #eaedf0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.car-img {
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 12px;
}

.card-title {
  font-size: 17px;
  color: #102A27;
  font-weight: 700;
}

.price-tag {
  color: #1F6F5B;
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
}

.btn-carhub-primary {
  background-color: #1F6F5B;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.btn-carhub-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-outline-carhub {
  border: 1px solid #1F6F5B;
  color: #1F6F5B;
  background: transparent;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-danger-carhub {
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.custom-input {
  border-radius: 8px;
  padding: 10px 14px;
  border: 1px solid #ced4da;
}

.bg-light-carhub {
  background-color: #e8f5e9;
  color: #1F6F5B;
  padding: 4px 10px;
  border-radius: 6px;
}

.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 20px;
}

.modal-content-custom {
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: #ffffff;
}

@media (max-width: 576px) {

  .main-title {
    font-size: 26px;
  }

  .price-tag {
    font-size: 13px;
  }

}
</style>