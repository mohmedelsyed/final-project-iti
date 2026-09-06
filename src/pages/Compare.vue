<template>
  <div>
    <Navbar />
    <div class="compare-page container my-5">
      <div class="text-center mb-5">
        <h1 class="main-title">Compare Cars</h1>
        <p class="text-muted fs-6">
          Compare technical specs and prices side by side to pick the right car
        </p>
      </div>

      <!-- Add car to comparison -->
      <div class="add-car-box mb-4">
        <label for="addCarSelect" class="fw-bold me-2">Add a car to compare:</label>
        <select
          id="addCarSelect"
          v-model="selectedCarToAdd"
          class="form-select add-car-select"
          :disabled="loading || availableCars.length === 0"
        >
          <option value="" disabled>Select a car</option>
          <option
            v-for="car in availableCars"
            :key="car.id"
            :value="car.id"
          >
            {{ car.name || car.brand }}
          </option>
        </select>
        <button
          class="btn add-btn"
          @click="addCar"
          :disabled="!selectedCarToAdd || compareCars.length >= maxCompare"
        >
          Add
        </button>
        <span v-if="compareCars.length >= maxCompare" class="max-note">
          Maximum {{ maxCompare }} cars can be compared at once
        </span>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="compareCars.length === 0" class="text-center my-5 text-muted">
        No cars selected. Choose a car above to start comparing.
      </div>

      <div v-else class="carhub-card large-container">
        <div class="table-responsive">
          <table class="table table-borderless align-middle text-center mb-0 compare-table">
            <colgroup>
              <col class="specs-col" />
              <col v-for="car in compareCars" :key="'col-' + car.id" class="car-col" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" class="text-start fs-5 text-dark fw-bold">
                  Specifications
                </th>
                <th scope="col" v-for="car in compareCars" :key="car.id">
                  <div class="position-relative p-2 car-header">
                    <button
                      class="btn-close remove-btn"
                      @click="removeCar(car.id)"
                      title="Remove from comparison"
                    ></button>
                    <div class="compare-img-wrap mb-3">
                      <img :src="car.image" :alt="car.name" class="compare-img" />
                    </div>
                    <h3 class="card-title mb-1">{{ car.name || car.brand }}</h3>
                    <span class="badge-price d-inline-block mt-1">
                      {{ Number(car.price).toLocaleString() }} EGP
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="row-striped">
                <td class="text-start fw-bold text-dark">Brand</td>
                <td v-for="car in compareCars" :key="car.id">{{ car.brand }}</td>
              </tr>
              <tr>
                <td class="text-start fw-bold text-dark">Year</td>
                <td v-for="car in compareCars" :key="car.id">{{ car.year }}</td>
              </tr>
              <tr class="row-striped">
                <td class="text-start fw-bold text-dark">Transmission</td>
                <td v-for="car in compareCars" :key="car.id">
                  {{ car.transmission || 'Automatic' }}
                </td>
              </tr>
              <tr>
                <td class="text-start fw-bold text-dark">Location</td>
                <td v-for="car in compareCars" :key="car.id">
                  {{ car.location || 'Cairo' }}
                </td>
              </tr>
              <tr class="row-striped">
                <td class="text-start fw-bold text-dark">Match Rate</td>
                <td v-for="car in compareCars" :key="car.id">
                  {{ car.match ? car.match + '%' : '95%' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'CompareView',
  components: {
    Navbar
  },
  data() {
    return {
      allCars: [],
      compareCars: [],
      selectedCarToAdd: '',
      loading: true,
      maxCompare: 3
    }
  },
  computed: {
    availableCars() {
      const comparedIds = this.compareCars.map(car => car.id);
      return this.allCars.filter(car => !comparedIds.includes(car.id));
    }
  },
  async mounted() {
    this.fetchAllCars();
  },
  methods: {
    async fetchAllCars() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost:3000/cars');
        this.allCars = response.data;
        this.compareCars = this.allCars.slice(0, 2);
      } catch (error) {
        console.error('Error fetching cars for comparison:', error);
      } finally {
        this.loading = false;
      }
    },
    addCar() {
      if (!this.selectedCarToAdd) return;

      if (this.compareCars.length >= this.maxCompare) {
        alert(`You can only compare up to ${this.maxCompare} cars at a time.`);
        return;
      }

      const car = this.allCars.find(c => c.id === this.selectedCarToAdd);
      if (car) {
        this.compareCars.push(car);
      }
      this.selectedCarToAdd = '';
    },
    removeCar(id) {
      if (this.compareCars.length <= 1) {
        alert('At least one car must remain in the comparison.');
        return;
      }
      this.compareCars = this.compareCars.filter(car => car.id !== id);
    }
  }
}
</script>

<style scoped>
.compare-page {
  padding: 64px 0;
}

@media (max-width: 768px) {
  .compare-page {
    padding: 40px 0;
  }
}

.main-title {
  font-size: 48px;
  color: #1F6F5B;
  font-weight: bold;
}

.add-car-box {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  background: #ffffff;
  border: 1px solid #B2DBBF;
  border-radius: 14px;
  padding: 16px 20px;
}

.add-car-select {
  width: auto;
  max-width: 260px;
  min-width: 200px;
  border: 1px solid #B2DBBF;
  border-radius: 10px;
}

.add-btn {
  background-color: #1F6F5B;
  color: #fff;
  border-radius: 10px;
  padding: 8px 18px;
  font-weight: 600;
  white-space: nowrap;
}

.add-btn:hover:not(:disabled) {
  background-color: #102A27;
  color: #fff;
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.max-note {
  font-size: 13px;
  color: #777;
}

.carhub-card.large-container {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(16, 42, 39, 0.08);
  background:
    linear-gradient(
      45deg,
      #102A27,
      #1F6F5B,
      #70C1B3,
      #B2DBBF,
      #F7FFF7
    );
}

/* Force equal, predictable column widths regardless of content */
.compare-table {
  table-layout: fixed;
  width: 100%;
}

.specs-col {
  width: 220px;
}

.car-col {
  width: 320px;
}

.compare-table th,
.compare-table td {
  word-wrap: break-word;
}

.car-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Fixed-size image container so every car card looks identical */
.compare-img-wrap {
  width: 100%;
  max-width: 260px;
  height: 160px;
  border-radius: 16px;
  overflow: hidden;
}

.compare-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-title {
  font-size: 20px;
  color: #1F6F5B;
  font-weight: bold;
  text-align: center;
}

.badge-price {
  background-color: #B2DBBF;
  color: #1F6F5B;
  padding: 6px 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
}

table td, table th {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.row-striped {
  background-color: #F7FFF7;
}

.remove-btn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 6px;
  z-index: 2;
}

@media (max-width: 768px) {
  .specs-col {
    width: 140px;
  }
  .car-col {
    width: 240px;
  }
  .compare-img-wrap {
    height: 120px;
  }
}
</style>