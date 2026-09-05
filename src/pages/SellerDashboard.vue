<template>
  <div class="seller-dashboard-page">
    <div class="container py-5">
      <!-- Header Section -->
      <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 class="main-title">┘ä┘ê╪¡╪⌐ ╪¬╪¡┘â┘à ╪º┘ä╪¿╪º╪ª╪╣</h1>
          <p class="sub-title mb-0">╪Ñ╪»╪º╪▒╪⌐ ╪│┘è╪º╪▒╪º╪¬┘â ╪º┘ä┘à╪╣╪▒┘ê╪╢╪⌐ ┘ä┘ä╪¿┘è╪╣ ┘ê┘à╪¬╪º╪¿╪╣╪⌐ ╪¡╪º┘ä╪⌐ ╪º┘ä╪Ñ╪╣┘ä╪º┘å╪º╪¬</p>
        </div>
        <button class="btn-carhub-primary" @click="showAddModal = true">
          + ╪Ñ╪╢╪º┘ü╪⌐ ╪│┘è╪º╪▒╪⌐ ╪¼╪»┘è╪»╪⌐
        </button>
      </div>

      <!-- Stats Section -->
      <div class="row g-4 mb-5">
        <div class="col-12 col-md-4">
          <div class="carhub-card">
            <span class="text-muted small">╪Ñ╪¼┘à╪º┘ä┘è ╪º┘ä╪│┘è╪º╪▒╪º╪¬</span>
            <h3 class="fs-2 fw-bold text-dark my-1">{{ cars.length }}</h3>
            <span class="badge bg-light-carhub">╪│┘è╪º╪▒╪º╪¬ ┘à╪╣╪▒┘ê╪╢╪⌐</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">╪¼╪º╪▒┘è ╪º┘ä╪¬╪¡┘à┘è┘ä...</span>
        </div>
      </div>

      <!-- Cars Grid -->
      <div v-else>
        <h2 class="section-title mb-4">┘é╪º╪ª┘à╪⌐ ╪│┘è╪º╪▒╪º╪¬┘è</h2>
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-4" v-for="car in cars" :key="car.id">
            <div class="carhub-card h-100 d-flex flex-column justify-content-between">
              <div>
                <img :src="car.image" :alt="car.name || car.brand" class="car-img mb-3" />
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h3 class="card-title mb-0">{{ car.name || car.brand }}</h3>
                  <span class="price-tag">{{ Number(car.price).toLocaleString() }} ╪¼.┘à</span>
                </div>
                <p class="text-muted small mb-3">
                  ╪º┘ä┘à╪º╪▒┘â╪⌐: {{ car.brand }} | ╪º┘ä╪│┘å╪⌐: {{ car.year }} | ╪º┘ä┘à┘ê┘é╪╣: {{ car.location || '╪º┘ä┘é╪º┘ç╪▒╪⌐' }}
                </p>
              </div>
              <div class="d-flex gap-2 pt-3 border-top">
                <button class="btn-outline-carhub w-50" @click="editCar(car)">╪¬╪╣╪»┘è┘ä ╪º┘ä╪│╪╣╪▒</button>
                <button class="btn-danger-carhub w-50" @click="deleteCar(car.id)">╪¡╪░┘ü</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Car Modal -->
      <div v-if="showAddModal" class="modal-backdrop-custom" @click.self="showAddModal = false">
        <div class="carhub-card modal-content-custom">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="card-title">╪Ñ╪╢╪º┘ü╪⌐ ╪│┘è╪º╪▒╪⌐ ╪¼╪»┘è╪»╪⌐</h3>
            <button type="button" class="btn-close" @click="showAddModal = false"></button>
          </div>
          <form @submit.prevent="addNewCar">
            <div class="mb-3">
              <label class="form-label small fw-bold">╪º┘ä┘à╪º╪▒┘â╪⌐ (Brand)</label>
              <input type="text" v-model="newCar.brand" class="form-control custom-input" placeholder="┘à╪½╪º┘ä: BMW" required />
            </div>
            <div class="mb-3">
              <label class="form-label small fw-bold">╪º╪│┘à ╪º┘ä╪│┘è╪º╪▒╪⌐ ┘ê╪º┘ä┘à┘ê╪»┘è┘ä</label>
              <input type="text" v-model="newCar.name" class="form-control custom-input" placeholder="┘à╪½╪º┘ä: BMW 3 Series" required />
            </div>
            <div class="row g-2 mb-3">
              <div class="col-6">
                <label class="form-label small">╪º┘ä╪│╪╣╪▒ (╪¼┘å┘è┘ç)</label>
                <input type="number" v-model="newCar.price" class="form-control custom-input" placeholder="1450000" required />
              </div>
              <div class="col-6">
                <label class="form-label small">╪│┘å╪⌐ ╪º┘ä╪╡┘å╪╣</label>
                <input type="number" v-model="newCar.year" class="form-control custom-input" placeholder="2024" required />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label small">╪º┘ä┘à╪¡╪º┘ü╪╕╪⌐ / ╪º┘ä┘à╪»┘è┘å╪⌐</label>
              <input type="text" v-model="newCar.location" class="form-control custom-input" placeholder="╪º┘ä┘é╪º┘ç╪▒╪⌐" required />
            </div>
            <div class="mb-3">
              <label class="form-label small">╪▒╪º╪¿╪╖ ╪╡┘ê╪▒╪⌐ ╪º┘ä╪│┘è╪º╪▒╪⌐ (Image URL)</label>
              <input type="url" v-model="newCar.image" class="form-control custom-input" placeholder="https://..." />
            </div>
            <div class="d-flex gap-2 justify-content-end mt-4">
              <button type="button" class="btn-outline-carhub" @click="showAddModal = false">╪Ñ┘ä╪║╪º╪í</button>
              <button type="submit" class="btn-carhub-primary">╪¡┘ü╪╕ ╪º┘ä╪│┘è╪º╪▒╪⌐</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'SellerDashboard',
  data() {
    return {
      showAddModal: false,
      loading: true,
      cars: [],
      newCar: {
        brand: '',
        name: '',
        price: '',
        year: '',
        location: '',
        transmission: '╪ú┘ê╪¬┘ê┘à╪º╪¬┘è┘â',
        match: 95,
        image: ''
      }
    };
  },
  async mounted() {
    this.fetchCars();
  },
  methods: {
    async fetchCars() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost:3000/cars');
        this.cars = response.data;
      } catch (error) {
        console.error('╪«╪╖╪ú ┘ü┘è ╪¼┘ä╪¿ ╪º┘ä╪¿┘è╪º┘å╪º╪¬:', error);
      } finally {
        this.loading = false;
      }
    },
    async addNewCar() {
      if (!this.newCar.image) {
        this.newCar.image = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500';
      }
      const payload = {
        ...this.newCar,
        price: Number(this.newCar.price),
        year: Number(this.newCar.year)
      };
      try {
        const response = await axios.post('http://localhost:3000/cars', payload);
        this.cars.push(response.data);
        this.showAddModal = false;
        this.resetForm();
        Swal.fire({ title: '╪¬┘à╪¬ ╪º┘ä╪Ñ╪╢╪º┘ü╪⌐!', icon: 'success', confirmButtonColor: '#1F6F5B' });
      } catch (error) {
        console.error('╪«╪╖╪ú ┘ü┘è ╪º┘ä╪Ñ╪╢╪º┘ü╪⌐:', error);
      }
    },
    deleteCar(id) {
      Swal.fire({
        title: '┘ç┘ä ╪ú┘å╪¬ ┘à╪¬╪ú┘â╪»╪ƒ',
        text: '╪│┘è╪¬┘à ╪¡╪░┘ü ╪º┘ä╪│┘è╪º╪▒╪⌐ ╪¿╪┤┘â┘ä ┘å┘ç╪º╪ª┘è',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#102A27',
        cancelButtonColor: '#d33',
        confirmButtonText: '┘å╪╣┘à╪î ╪º╪¡╪░┘ü┘ç╪º',
        cancelButtonText: '╪Ñ┘ä╪║╪º╪í'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:3000/cars/${id}`);
            this.cars = this.cars.filter((car) => car.id !== id);
            Swal.fire({ title: '╪¬┘à ╪º┘ä╪¡╪░┘ü', icon: 'success', confirmButtonColor: '#1F6F5B' });
          } catch (error) {
            console.error('╪«╪╖╪ú ╪ú╪½┘å╪º╪í ╪º┘ä╪¡╪░┘ü:', error);
          }
        }
      });
    },
    editCar(car) {
      Swal.fire({
        title: '╪¬╪╣╪»┘è┘ä ╪º┘ä╪│╪╣╪▒',
        input: 'number',
        inputValue: car.price,
        showCancelButton: true,
        confirmButtonColor: '#1F6F5B',
        confirmButtonText: '╪¡┘ü╪╕',
        cancelButtonText: '╪Ñ┘ä╪║╪º╪í'
      }).then(async (result) => {
        if (result.isConfirmed && result.value) {
          const newPrice = Number(result.value);
          try {
            await axios.patch(`http://localhost:3000/cars/${car.id}`, { price: newPrice });
            car.price = newPrice;
            Swal.fire({ title: '╪¬┘à ╪º┘ä╪¬╪¡╪»┘è╪½!', icon: 'success', confirmButtonColor: '#1F6F5B' });
          } catch (error) {
            console.error('╪«╪╖╪ú ┘ü┘è ╪º┘ä╪¬╪¡╪»┘è╪½:', error);
          }
        }
      });
    },
    resetForm() {
      this.newCar = { brand: '', name: '', price: '', year: '', location: '', transmission: '╪ú┘ê╪¬┘ê┘à╪º╪¬┘è┘â', match: 95, image: '' };
    }
  }
};
</script>

<style scoped>
.seller-dashboard-page {
  direction: rtl;
  text-align: right;
  width: 100%;
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
}

.btn-carhub-primary {
  background-color: #1F6F5B;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
}

.btn-outline-carhub {
  border: 1px solid #1F6F5B;
  color: #1F6F5B;
  background: transparent;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
}

.btn-danger-carhub {
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  direction: rtl;
}

.modal-content-custom {
  width: 90%;
  max-width: 500px;
  background-color: #ffffff;
}
</style>
