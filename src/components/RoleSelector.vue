<template>
  <section id="role-selector" class="role-section">
    <div class="container">
      <div class="section-header">
        <h2 class="title">اختر مسارك في المنصة</h2>
        <p class="subtitle">سواء كنت تبحث عن شراء سيارتك القادمة أو تريد بيع سيارتك بأفضل سعر وحماية كاملة</p>
      </div>

      <!-- Role Cards Toggle -->
      <div class="role-cards">
        <!-- Buyer Card -->
        <div 
          class="role-card" 
          :class="{ 'active': activeRole === 'buyer' }"
          @click="selectRole('buyer')"
        >
          <div class="role-badge">المشتري (Buyer)</div>
          <div class="icon-circle">
            <span>🔑</span>
          </div>
          <h3>أريد شراء سيارة</h3>
          <p>تصفح آلاف السيارات المفحوصة والمضمونة مع خيارات تقسيط ميسرة وحماية لجميع أموالك.</p>
          
          <ul class="role-features">
            <li>✓ فحص فني شامل بـ 150+ نقطة</li>
            <li>✓ ضمان كامل لمدة سنة أو 20,000 كم</li>
            <li>✓ تقسيط مباشر بدون حظر ملكية</li>
          </ul>

          <button class="btn-role" :class="activeRole === 'buyer' ? 'btn-active' : 'btn-inactive'">
            {{ activeRole === 'buyer' ? 'أنت في وضع المشتري الان 🎯' : 'اختر وضع المشتري' }}
          </button>
        </div>

        <!-- Seller Card -->
        <div 
          class="role-card" 
          :class="{ 'active': activeRole === 'seller' }"
          @click="selectRole('seller')"
        >
          <div class="role-badge seller-badge">البائع (Seller)</div>
          <div class="icon-circle seller-icon">
            <span>💰</span>
          </div>
          <h3>أريد بيع سيارتي</h3>
          <p>اعرض سيارتك لأكثر من 500,000 مشتري جاد أو بعها فوراً للمعرض بأعلى تقييم عادل.</p>
          
          <ul class="role-features">
            <li>✓ تقييم فوري مجاني من الخبراء</li>
            <li>✓ دفع نقدي أونلاين فور توقيع العقد</li>
            <li>✓ نقل ملكية آمن وبدون إجراءات تعقيدية</li>
          </ul>

          <button class="btn-role" :class="activeRole === 'seller' ? 'btn-active-seller' : 'btn-inactive'">
            {{ activeRole === 'seller' ? 'أنت في وضع البائع الان ⚡' : 'اختر وضع البائع' }}
          </button>
        </div>
      </div>

      <!-- Steps Breakdown -->
      <div class="steps-container">
        <h4 class="steps-title">
          خطوات {{ activeRole === 'buyer' ? 'الشراء' : 'البيع' }} في 3 خطوات بسيطة:
        </h4>

        <div class="steps-grid" v-if="activeRole === 'buyer'">
          <div class="step-card">
            <span class="step-num">01</span>
            <h4>اختر السيارة</h4>
            <p>تصفح واقارن الموديلات والأسعار مع تقارير الفحص المرفقة.</p>
          </div>
          <div class="step-card">
            <span class="step-num">02</span>
            <h4>احجز معاينة</h4>
            <p>حدد موعد لمعاينة السيارة وتجربة القيادة بنفسك.</p>
          </div>
          <div class="step-card">
            <span class="step-num">03</span>
            <h4>استلم المفتاح</h4>
            <p>استكمل نقل الملكية بسهولة واستلم سيارتك جاهزة!</p>
          </div>
        </div>

        <div class="steps-grid" v-else>
          <div class="step-card">
            <span class="step-num">01</span>
            <h4>أضف البيانات</h4>
            <p>ادخل تفاصيل السيارة والصور لتلقي عروض الشراء.</p>
          </div>
          <div class="step-card">
            <span class="step-num">02</span>
            <h4>الفحص التقييمي</h4>
            <p>يقوم الخبير بفحص السيارة وتأكيد قيمتها العادلة.</p>
          </div>
          <div class="step-card">
            <span class="step-num">03</span>
            <h4>قبول العرض والكاش</h4>
            <p>وافق على العرض واستلم أموالك في نفس اليوم!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['role-change'])

const activeRole = ref('buyer')

const selectRole = (role) => {
  activeRole.value = role
  emit('role-change', role)
}
</script>

<style scoped>
.role-section {
  padding: 6rem 0;
  background: #0f172a;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 0.75rem;
}

.subtitle {
  color: #94a3b8;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.role-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.role-card {
  position: relative;
  background: #1e293b;
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.role-card:hover {
  transform: translateY(-5px);
  border-color: rgba(66, 184, 131, 0.4);
}

.role-card.active {
  background: linear-gradient(145deg, #1e293b, #0f172a);
  border-color: #42b883;
  box-shadow: 0 20px 40px -10px rgba(66, 184, 131, 0.25);
}

.role-badge {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
  padding: 0.3rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.seller-badge {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
}

.icon-circle {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: rgba(66, 184, 131, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.seller-icon {
  background: rgba(56, 189, 248, 0.15);
}

.role-card h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.75rem;
}

.role-card p {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.role-features {
  list-style: none;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.role-features li {
  color: #cbd5e1;
  font-size: 0.95rem;
  font-weight: 600;
}

.btn-role {
  margin-top: auto;
  padding: 0.85rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}

.btn-active {
  background: #42b883;
  color: #0f172a;
  box-shadow: 0 4px 15px rgba(66, 184, 131, 0.3);
}

.btn-active-seller {
  background: #38bdf8;
  color: #0f172a;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
}

.btn-inactive {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.steps-container {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
}

.steps-title {
  font-size: 1.3rem;
  color: #f8fafc;
  margin-bottom: 2rem;
  text-align: center;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.step-card {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.75rem;
  border-radius: 16px;
  position: relative;
}

.step-num {
  font-size: 2.2rem;
  font-weight: 800;
  color: rgba(66, 184, 131, 0.2);
  position: absolute;
  top: 1rem;
  left: 1.25rem;
}

.step-card h4 {
  font-size: 1.15rem;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

.step-card p {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .role-cards {
    grid-template-columns: 1fr;
  }

  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
