<template>
  <section id="hero" class="hero-section">
    <div class="hero-bg-glow"></div>
    <div class="hero-container">
      <div class="hero-content">
        <div class="badge-tag">⚡ المنصة الأولى لشراء وبيع السيارات</div>
        <h1 class="hero-title">
          اعثر على سيارة أحلامك أو <span class="gradient-text">بع سيارتك بأعلى سعر</span>
        </h1>
        <p class="hero-subtitle">
          سوق متكامل يقدم لك أفضل عروض السيارات الفاخرة والاقتصادية مع فحص شامل وصدمات معتمدة وخدمات تمويل فورية.
        </p>

        <!-- Search Box Filter -->
        <div class="search-box">
          <div class="filter-group">
            <label>الماركة</label>
            <select v-model="searchFilter.make">
              <option value="">جميع الماركات</option>
              <option value="Mercedes-Benz">مرسيدس بنز</option>
              <option value="BMW">بي إم دبليو</option>
              <option value="Audi">أودي</option>
              <option value="Toyota">تويوتا</option>
              <option value="Porsche">بورش</option>
            </select>
          </div>

          <div class="filter-group">
            <label>الحالة</label>
            <select v-model="searchFilter.condition">
              <option value="all">الكل</option>
              <option value="new">جديدة (0 كم)</option>
              <option value="used">مستعملة معتمدة</option>
            </select>
          </div>

          <div class="filter-group">
            <label>أقصى سعر (جنيه)</label>
            <input type="number" placeholder="مثال: 1,500,000" v-model="searchFilter.maxPrice" />
          </div>

          <button class="search-btn" @click="handleSearch">
            <span>بحث</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <!-- Hero Stats -->
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num">+15,000</span>
            <span class="stat-label">سيارة معروضة</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">99%</span>
            <span class="stat-label">نسبة رضا العملاء</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">24/7</span>
            <span class="stat-label">دعم وتقييم فوري</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['search'])

const searchFilter = reactive({
  make: '',
  condition: 'all',
  maxPrice: ''
})

const handleSearch = () => {
  emit('search', { ...searchFilter })
}
</script>

<style scoped>
.hero-section {
  position: relative;
  padding: 10rem 0 6rem;
  background: radial-gradient(circle at 50% 20%, #1e293b 0%, #0f172a 70%);
  overflow: hidden;
}

.hero-bg-glow {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.15) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 70%);
  pointer-events: none;
  filter: blur(60px);
}

.hero-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.badge-tag {
  background: rgba(66, 184, 131, 0.12);
  border: 1px solid rgba(66, 184, 131, 0.3);
  color: #42b883;
  padding: 0.5rem 1.25rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.25;
  color: #f8fafc;
  margin-bottom: 1.25rem;
}

.gradient-text {
  background: linear-gradient(135deg, #42b883, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 3rem;
  max-width: 750px;
}

.search-box {
  width: 100%;
  background: rgba(30, 41, 59, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 1.25rem 1.75rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 3.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}

.filter-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #94a3b8;
}

.filter-group select,
.filter-group input {
  width: 100%;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  font-family: inherit;
}

.search-btn {
  height: 100%;
  margin-top: 1.3rem;
  background: linear-gradient(135deg, #42b883, #33a06f);
  color: #0f172a;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  font-family: inherit;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(66, 184, 131, 0.45);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 1.25rem 2.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 1.8rem;
  font-weight: 800;
  color: #42b883;
}

.stat-label {
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 600;
}

.stat-divider {
  width: 1px;
  height: 35px;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 900px) {
  .hero-title {
    font-size: 2.2rem;
  }
  
  .search-box {
    grid-template-columns: 1fr;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1.25rem;
    border-radius: 20px;
  }
  
  .stat-divider {
    display: none;
  }
}
</style>
