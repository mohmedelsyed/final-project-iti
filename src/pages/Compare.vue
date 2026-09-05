<template>
  <div class="compare-page container my-5">
    <div class="text-center mb-5">
      <h1 class="main-title">┘à┘é╪º╪▒┘å╪⌐ ╪º┘ä╪│┘è╪º╪▒╪º╪¬</h1>
      <p class="text-muted fs-6">┘é╪º╪▒┘å ╪º┘ä┘à┘ê╪º╪╡┘ü╪º╪¬ ╪º┘ä╪¬┘é┘å┘è╪⌐ ┘ê╪º┘ä╪ú╪│╪╣╪º╪▒ ╪¼┘å╪¿┘ï╪º ╪Ñ┘ä┘ë ╪¼┘å╪¿ ┘ä╪º╪«╪¬┘è╪º╪▒ ╪º┘ä╪│┘è╪º╪▒╪⌐ ╪º┘ä╪ú┘å╪│╪¿</p>
    </div>

    <!-- ╪¡╪º┘ä╪⌐ ╪º┘ä╪¬╪¡┘à┘è┘ä -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">╪¼╪º╪▒┘è ╪º┘ä╪¬╪¡┘à┘è┘ä...</span>
      </div>
    </div>

    <div v-else class="carhub-card large-container">
      <div class="table-responsive">
        <table class="table table-borderless align-middle text-center mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-start fs-5 text-dark fw-bold" style="width: 20%;">╪º┘ä┘à┘ê╪º╪╡┘ü╪º╪¬</th>
              <th scope="col" v-for="car in compareCars" :key="car.id" style="width: 40%;">
                <div class="position-relative p-2">
                  <button class="btn-close remove-btn" @click="removeCar(car.id)" title="╪Ñ╪▓╪º┘ä╪⌐ ┘à┘å ╪º┘ä┘à┘é╪º╪▒┘å╪⌐"></button>
                  <img :src="car.image" :alt="car.name" class="compare-img mb-3" />
                  <h3 class="card-title mb-1">{{ car.name || car.brand }}</h3>
                  <span class="badge-price d-inline-block mt-1">{{ Number(car.price).toLocaleString() }} ╪¼.┘à</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="row-striped">
              <td class="text-start fw-bold text-dark">╪º┘ä┘à╪º╪▒┘â╪⌐</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.brand }}</td>
            </tr>
            <tr>
              <td class="text-start fw-bold text-dark">╪│┘å╪⌐ ╪º┘ä╪╡┘å╪╣</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.year }}</td>
            </tr>
            <tr class="row-striped">
              <td class="text-start fw-bold text-dark">┘å╪º┘é┘ä ╪º┘ä╪¡╪▒┘â╪⌐</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.transmission || '╪ú┘ê╪¬┘ê┘à╪º╪¬┘è┘â' }}</td>
            </tr>
            <tr>
              <td class="text-start fw-bold text-dark">╪º┘ä┘à┘â╪º┘å</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.location || '╪º┘ä┘é╪º┘ç╪▒╪⌐' }}</td>
            </tr>
            <tr class="row-striped">
              <td class="text-start fw-bold text-dark">┘å╪│╪¿╪⌐ ╪º┘ä╪¬┘ê╪º┘ü┘é</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.match ? car.match + '%' : '95%' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CompareView',
  data() {
    return {
      compareCars: [],
      loading: true
    }
  },
  async mounted() {
    this.fetchCompareCars();
  },
  methods: {
    async fetchCompareCars() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost:3000/cars');
        // ╪╣╪▒╪╢ ╪ú┘ê┘ä ╪│┘è╪º╪▒╪¬┘è┘å ┘ü┘é╪╖ ┘ä┘ä┘à┘é╪º╪▒┘å╪⌐ ╪¿┘è┘å┘ç┘à╪º
        this.compareCars = response.data.slice(0, 2);
      } catch (error) {
        console.error('╪«╪╖╪ú ┘ü┘è ╪¼┘ä╪¿ ╪¿┘è╪º┘å╪º╪¬ ╪º┘ä┘à┘é╪º╪▒┘å╪⌐:', error);
      } finally {
        this.loading = false;
      }
    },
    removeCar(id) {
      if (this.compareCars.length <= 1) {
        alert('┘è╪¼╪¿ ╪º┘ä╪Ñ╪¿┘é╪º╪í ╪╣┘ä┘ë ╪│┘è╪º╪▒╪⌐ ┘ê╪º╪¡╪»╪⌐ ╪╣┘ä┘ë ╪º┘ä╪ú┘é┘ä ┘ü┘è ╪º┘ä┘à┘é╪º╪▒┘å╪⌐');
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
  color: #102A27;
  font-weight: bold;
}

.carhub-card.large-container {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(16, 42, 39, 0.08);
}

.compare-img {
  width: 100%;
  max-width: 280px;
  height: 160px;
  object-fit: cover;
  border-radius: 16px;
}

.card-title {
  font-size: 20px;
  color: #102A27;
  font-weight: bold;
}

.badge-price {
  background-color: #B2DBBF;
  color: #102A27;
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
  top: 10px;
  left: 10px;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 6px;
  z-index: 2;
}
</style>
