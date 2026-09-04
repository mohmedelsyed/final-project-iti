<template>
  <section id="featured-cars" class="featured-section">
    <div class="container">
      <div class="section-header">
        <div>
          <h2 class="title">السيارات المميزة والمعتمدة</h2>
          <p class="subtitle">أحدث السيارات المعروضة للبيع بأعلى مواصفات الجودة وضمان المعاينة</p>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs">
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            class="tab-btn"
            :class="{ 'active': activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Cars Grid -->
      <div class="cars-grid">
        <div 
          v-for="car in filteredCars" 
          :key="car.id"
          class="car-card"
        >
          <!-- Car Image Header -->
          <div class="card-image-box" :style="{ backgroundColor: car.bgColor }">
            <span class="status-badge" :class="car.condition === 'new' ? 'badge-new' : 'badge-used'">
              {{ car.condition === 'new' ? 'زيرو 0 كم' : 'مستعملة مضمونة' }}
            </span>
            <div class="car-illustration">
              <span class="car-emoji">{{ car.icon }}</span>
            </div>
            <button class="favorite-btn" @click="toggleFavorite(car)">
              <span v-if="car.isFavorite">❤️</span>
              <span v-else>🤍</span>
            </button>
          </div>

          <!-- Car Info Body -->
          <div class="card-body">
            <div class="make-year">
              <span class="make">{{ car.make }}</span>
              <span class="year">{{ car.year }}</span>
            </div>
            <h3 class="model-title">{{ car.title }}</h3>

            <div class="specs-row">
              <div class="spec-item">
                <span class="spec-icon">🛣️</span>
                <span>{{ car.mileage }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-icon">⚙️</span>
                <span>{{ car.transmission }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-icon">⛽</span>
                <span>{{ car.fuel }}</span>
              </div>
            </div>

            <div class="card-footer">
              <div class="price-box">
                <span class="price-label">السعر:</span>
                <span class="price-val">{{ car.price.toLocaleString() }} <small>ج.م</small></span>
              </div>

              <button class="details-btn" @click="openDetails(car)">التفاصيل</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal-backdrop" v-if="selectedCar" @click.self="selectedCar = null">
        <div class="modal-content">
          <button class="close-btn" @click="selectedCar = null">✕</button>
          <div class="modal-header-box" :style="{ backgroundColor: selectedCar.bgColor }">
            <span class="modal-emoji">{{ selectedCar.icon }}</span>
          </div>
          <div class="modal-body">
            <h3>{{ selectedCar.title }} ({{ selectedCar.year }})</h3>
            <p class="modal-price">{{ selectedCar.price.toLocaleString() }} جنيه مصري</p>
            
            <div class="modal-specs">
              <div><strong>الماركة:</strong> {{ selectedCar.make }}</div>
              <div><strong>الحالة:</strong> {{ selectedCar.condition === 'new' ? 'جديدة بالكامل' : 'مستعملة معتمدة' }}</div>
              <div><strong>العداد:</strong> {{ selectedCar.mileage }}</div>
              <div><strong>ناقل الحركة:</strong> {{ selectedCar.transmission }}</div>
              <div><strong>نوع الوقود:</strong> {{ selectedCar.fuel }}</div>
              <div><strong>موقع المعاينة:</strong> القاهرة - التجمع الخامس</div>
            </div>

            <div class="modal-actions">
              <button class="btn-primary-modal">تواصل مع البائع الآن</button>
              <button class="btn-secondary-modal" @click="selectedCar = null">إغلاق</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')
const selectedCar = ref(null)

const categories = [
  { id: 'all', name: 'جميع السيارات' },
  { id: 'luxury', name: 'فاخرة' },
  { id: 'suv', name: 'SUV عائلية' },
  { id: 'electric', name: 'كهربائية' }
]

const cars = ref([
  {
    id: 1,
    title: 'مرسيدس بنز E200 AMG Package',
    make: 'Mercedes-Benz',
    year: 2024,
    price: 4250000,
    mileage: '0 كم',
    transmission: 'أتوماتيك 9 سرعات',
    fuel: 'بنزين',
    category: 'luxury',
    condition: 'new',
    bgColor: '#1e293b',
    icon: '🏎️',
    isFavorite: false
  },
  {
    id: 2,
    title: 'بي إم دبليو X5 M50i xDrive',
    make: 'BMW',
    year: 2023,
    price: 5600000,
    mileage: '15,000 كم',
    transmission: 'أتوماتيك Steptronic',
    fuel: 'بنزين',
    category: 'suv',
    condition: 'used',
    bgColor: '#0f172a',
    icon: '🚙',
    isFavorite: true
  },
  {
    id: 3,
    title: 'بورش تايكان GTS Electric',
    make: 'Porsche',
    year: 2024,
    price: 6800000,
    mileage: '0 كم',
    transmission: 'كهربائي فوري',
    fuel: 'كهرباء 100%',
    category: 'electric',
    condition: 'new',
    bgColor: '#1e293b',
    icon: '⚡',
    isFavorite: false
  },
  {
    id: 4,
    title: 'أودي A6 S-Line Quattro',
    make: 'Audi',
    year: 2022,
    price: 3100000,
    mileage: '32,000 كم',
    transmission: 'أوتوماتيك S-Tronic',
    fuel: 'بنزين',
    category: 'luxury',
    condition: 'used',
    bgColor: '#0f172a',
    icon: '🚘',
    isFavorite: false
  },
  {
    id: 5,
    title: 'تويوتا لاند كروزر VXR V6 Turbo',
    make: 'Toyota',
    year: 2023,
    price: 5200000,
    mileage: '10,000 كم',
    transmission: 'أوتوماتيك 10 سرعات',
    fuel: 'بنزين',
    category: 'suv',
    condition: 'used',
    bgColor: '#1e293b',
    icon: '🛻',
    isFavorite: false
  },
  {
    id: 6,
    title: 'تسلا موديل Y Performance AWD',
    make: 'Tesla',
    year: 2024,
    price: 3900000,
    mileage: '0 كم',
    transmission: 'أوتوماتيك كهربائي',
    fuel: 'كهرباء 100%',
    category: 'electric',
    condition: 'new',
    bgColor: '#0f172a',
    icon: '🔋',
    isFavorite: false
  }
])

const filteredCars = computed(() => {
  if (activeCategory.value === 'all') return cars.value
  return cars.value.filter(c => c.category === activeCategory.value)
})

const toggleFavorite = (car) => {
  car.isFavorite = !car.isFavorite
}

const openDetails = (car) => {
  selectedCar.value = car
}
</script>

<style scoped>
.featured-section {
  padding: 6rem 0;
  background: #0b1120;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #94a3b8;
  font-size: 1.05rem;
}

.filter-tabs {
  display: flex;
  gap: 0.75rem;
  background: #1e293b;
  padding: 0.4rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.tab-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}

.tab-btn.active {
  background: #42b883;
  color: #0f172a;
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.car-card {
  background: #1e293b;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.car-card:hover {
  transform: translateY(-8px);
  border-color: rgba(66, 184, 131, 0.3);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
}

.card-image-box {
  height: 180px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.car-illustration {
  font-size: 5rem;
}

.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.badge-new {
  background: rgba(66, 184, 131, 0.2);
  color: #42b883;
  border: 1px solid rgba(66, 184, 131, 0.4);
}

.badge-used {
  background: rgba(56, 189, 248, 0.2);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.4);
}

.favorite-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(15, 23, 42, 0.6);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.make-year {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #42b883;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.model-title {
  font-size: 1.2rem;
  color: #f8fafc;
  margin-bottom: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
}

.specs-row {
  display: flex;
  justify-content: space-between;
  background: #0f172a;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #94a3b8;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-box {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 0.75rem;
  color: #94a3b8;
}

.price-val {
  font-size: 1.25rem;
  font-weight: 800;
  color: #f8fafc;
}

.price-val small {
  font-size: 0.75rem;
  color: #42b883;
}

.details-btn {
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
  border: 1px solid rgba(66, 184, 131, 0.3);
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}

.details-btn:hover {
  background: #42b883;
  color: #0f172a;
}

/* Modal Styling */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-content {
  background: #1e293b;
  border-radius: 24px;
  max-width: 550px;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  z-index: 10;
}

.modal-header-box {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-emoji {
  font-size: 6rem;
}

.modal-body {
  padding: 2rem;
}

.modal-body h3 {
  font-size: 1.5rem;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

.modal-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #42b883;
  margin-bottom: 1.5rem;
}

.modal-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: #0f172a;
  padding: 1.25rem;
  border-radius: 16px;
  margin-bottom: 1.75rem;
  color: #94a3b8;
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.btn-primary-modal {
  flex: 1;
  background: #42b883;
  color: #0f172a;
  padding: 0.85rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
}

.btn-secondary-modal {
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
  padding: 0.85rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

@media (max-width: 900px) {
  .cars-grid {
    grid-template-columns: 1fr;
  }
}
</style>
