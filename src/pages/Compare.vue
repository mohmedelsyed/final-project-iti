<template>
  <div>
    <Navbar />
    <div class="compare-page container my-5">
    <div class="text-center mb-5">
      <h1 class="main-title">مقارنة السيارات</h1>
      <p class="text-muted fs-6">قارن المواصفات التقنية والأسعار جنبًا إلى جنب لاختيار السيارة الأنسب</p>
    </div>

    <!-- حالة التحميل -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">جاري التحميل...</span>
      </div>
    </div>

    <div v-else class="carhub-card large-container">
      <div class="table-responsive">
        <table class="table table-borderless align-middle text-center mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-start fs-5 text-dark fw-bold" style="width: 20%;">المواصفات</th>
              <th scope="col" v-for="car in compareCars" :key="car.id" style="width: 40%;">
                <div class="position-relative p-2">
                  <button class="btn-close remove-btn" @click="removeCar(car.id)" title="إزالة من المقارنة"></button>
                  <img :src="car.image" :alt="car.name" class="compare-img mb-3" />
                  <h3 class="card-title mb-1">{{ car.name || car.brand }}</h3>
                  <span class="badge-price d-inline-block mt-1">{{ Number(car.price).toLocaleString() }} ج.م</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="row-striped">
              <td class="text-start fw-bold text-dark">الماركة</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.brand }}</td>
            </tr>
            <tr>
              <td class="text-start fw-bold text-dark">سنة الصنع</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.year }}</td>
            </tr>
            <tr class="row-striped">
              <td class="text-start fw-bold text-dark">ناقل الحركة</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.transmission || 'أوتوماتيك' }}</td>
            </tr>
            <tr>
              <td class="text-start fw-bold text-dark">المكان</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.location || 'القاهرة' }}</td>
            </tr>
            <tr class="row-striped">
              <td class="text-start fw-bold text-dark">نسبة التوافق</td>
              <td v-for="car in compareCars" :key="car.id">{{ car.match ? car.match + '%' : '95%' }}</td>
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
        // عرض أول سيارتين فقط للمقارنة بينهما
        this.compareCars = response.data.slice(0, 2);
      } catch (error) {
        console.error('خطأ في جلب بيانات المقارنة:', error);
      } finally {
        this.loading = false;
      }
    },
    removeCar(id) {
      if (this.compareCars.length <= 1) {
        alert('يجب الإبقاء على سيارة واحدة على الأقل في المقارنة');
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
  color:  #1F6F5B;
  font-weight: bold;
  
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

.compare-img {
  width: 100%;
  max-width: 280px;
  height: 160px;
  object-fit: cover;
  border-radius: 16px;
}

.card-title {
  font-size: 20px;
  color:  #1F6F5B;
  font-weight: bold;
  
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
  top: 10px;
  left: 10px;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 6px;
  z-index: 2;
  
}
</style>