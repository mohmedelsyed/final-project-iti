<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-icon">🚗</span>
            <span class="logo-text">Auto<span class="highlight">ITI</span></span>
          </div>
          <p class="brand-desc">
            المنصة الأولى المعتمدة لبيع وشراء السيارات بأمان تام وتجربة رقمية فريدة.
          </p>
          <div class="social-links">
            <a href="#" class="social-btn">📱</a>
            <a href="#" class="social-btn">💬</a>
            <a href="#" class="social-btn">🌐</a>
            <a href="#" class="social-btn">📸</a>
          </div>
        </div>

        <div class="footer-links-group">
          <h4>روابط سريعة</h4>
          <ul>
            <li><a href="#hero">الرئيسية</a></li>
            <li><a href="#role-selector">مسار المشتري والبائع</a></li>
            <li><a href="#featured-cars">السيارات المعروضة</a></li>
            <li><a href="#services">خدمات الفحص والتمويل</a></li>
          </ul>
        </div>

        <div class="footer-links-group">
          <h4>فئات السيارات</h4>
          <ul>
            <li><a href="#featured-cars">السيارات الفاخرة</a></li>
            <li><a href="#featured-cars">سيارات الـ SUV</a></li>
            <li><a href="#featured-cars">السيارات الكهربائية</a></li>
            <li><a href="#featured-cars">سيارات المستعمل المضمون</a></li>
          </ul>
        </div>

        <div class="footer-newsletter">
          <h4>النشرة البريدية</h4>
          <p>اشترك للحصول على أحدث العروض والسيارات فور وصولها والمعروضات التنافسية.</p>

          <form @submit.prevent="subscribe" class="newsletter-form">
            <input 
              type="email" 
              placeholder="ادخل بريدك الإلكتروني" 
              v-model="emailInput" 
              required 
            />
            <button type="submit" class="btn-sub">اشتراك</button>
          </form>
          <span v-if="subscribed" class="sub-msg">تم الاشتراك بنجاح! 🎉</span>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 AutoITI - جميع الحقوق محفوظة | تم التطوير كمشروع نهائي لـ ITI</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const emailInput = ref('')
const subscribed = ref(false)

const subscribe = () => {
  if (emailInput.value) {
    subscribed.value = true
    emailInput.value = ''
    setTimeout(() => {
      subscribed.value = false
    }, 4000)
  }
}
</script>

<style scoped>
.footer {
  background: #0b1120;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 5rem 0 2rem;
  color: #94a3b8;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 1.8rem;
}

.logo-text {
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
}

.highlight {
  color: #42b883;
}

.brand-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.25s ease;
}

.social-btn:hover {
  background: #42b883;
  transform: translateY(-3px);
}

.footer-links-group h4,
.footer-newsletter h4 {
  color: #f8fafc;
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
  font-weight: 700;
}

.footer-links-group ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links-group a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.25s ease;
}

.footer-links-group a:hover {
  color: #42b883;
}

.footer-newsletter p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-form input {
  flex: 1;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  font-family: inherit;
}

.newsletter-form input:focus {
  border-color: #42b883;
}

.btn-sub {
  background: #42b883;
  color: #0f172a;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
}

.sub-msg {
  display: block;
  margin-top: 0.75rem;
  color: #42b883;
  font-weight: 700;
  font-size: 0.85rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 2rem;
  text-align: center;
  font-size: 0.85rem;
}

@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
