<template>
  <section id="services" class="services-section">
    <div class="container">
      <div class="section-header">
        <span class="badge-tag">خدماتنا المتكاملة</span>
        <h2 class="title">كل ما تحتاجه لتجربة شراء وبيع سلسة</h2>
        <p class="subtitle">نوفر لك باقة شاملة من الخدمات الاحترافية لتضمن حماية استثمارك وأمان معلقاتك المالية.</p>
      </div>

      <div class="services-grid">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="service-card"
        >
          <div class="icon-box">
            <span>{{ service.icon }}</span>
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          
          <ul class="feature-list">
            <li v-for="(feat, idx) in service.features" :key="idx">
              • {{ feat }}
            </li>
          </ul>

          <a href="#" class="service-link">
            <span>معرفة المزيد</span>
            <span class="arrow">←</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    id: 1,
    icon: '📋',
    title: 'فحص فني شامل بـ 150 نقطة',
    description: 'تقرير فحص دقيق يغطي المحرك، الناقل، الدهانات، والهيكل مع ضمان خلو السيارة من الحوادث الجسيمة.',
    features: ['تقرير ديجيتال بالصور', 'قياس سمك الطلاء', 'اختبار الأعطال بالكمبيوتر']
  },
  {
    id: 2,
    icon: '💳',
    title: 'تمويل وتقسيط ميسر',
    description: 'خطط تقسيط مرنة حتى 7 سنوات بالتعاون مع كبرى البنوك وشركات التمويل بدون إجراءات معقدة.',
    features: ['موافقة خلال 24 ساعة', 'مقدم يبدأ من 20%', 'بدون حظر ملكية (اختياري)']
  },
  {
    id: 3,
    icon: '🛡️',
    title: 'ضمان ممتد مجاناً',
    description: 'احصل على ضمان حقيقي يغطي المحرك والفتيس ونظام التكييف لمدة عام كامل مع خدمة سحب السيارة.',
    features: ['تغطية لأجزاء المحرك', 'مساعدة على الطريق 24/7', 'استبدال قطع غيار أصلية']
  },
  {
    id: 4,
    icon: '📑',
    title: 'نقل ملكية وتسجيل قانوني',
    description: 'يتولى فريقنا القانوني كافة إجراءات الشهر العقاري والمرور لضمان سلامة الأوراق ونقل الملكية بصفة رسمية.',
    features: ['الاستعلام عن المخالفات', 'توثيق العقود فوراً', 'تسليم الرخصة في المنزل']
  }
]
</script>

<style scoped>
.services-section {
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
  margin-bottom: 4rem;
}

.badge-tag {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid rgba(56, 189, 248, 0.3);
  display: inline-block;
  margin-bottom: 1rem;
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
  max-width: 650px;
  margin: 0 auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.service-card {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}

.icon-box {
  width: 55px;
  height: 55px;
  border-radius: 16px;
  background: rgba(56, 189, 248, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.service-card h3 {
  font-size: 1.25rem;
  color: #f8fafc;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.service-card p {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.feature-list {
  list-style: none;
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-list li {
  font-size: 0.825rem;
  color: #cbd5e1;
}

.service-link {
  margin-top: auto;
  color: #38bdf8;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: gap 0.25s ease;
}

.service-card:hover .service-link {
  gap: 0.8rem;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
