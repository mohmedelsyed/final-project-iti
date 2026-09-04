<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="navbar-container">
      <div class="logo">
        <a href="#">
          <span class="logo-icon">🚗</span>
          <span class="logo-text">Auto<span class="highlight">ITI</span></span>
        </a>
      </div>

      <ul class="nav-links" :class="{ 'active': mobileMenuOpen }">
        <li><a href="#hero" @click="closeMenu">الرئيسية</a></li>
        <li><a href="#role-selector" @click="closeMenu">مشتري / بائع</a></li>
        <li><a href="#featured-cars" @click="closeMenu">السيارات المميزة</a></li>
        <li><a href="#services" @click="closeMenu">خدماتنا</a></li>
      </ul>

      <div class="nav-actions">
        <button class="btn btn-outline-nav">تسجيل الدخول</button>
        <button class="btn btn-primary-nav">+ أضف سيارتك</button>
        <button class="mobile-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 0;
  transition: all 0.3s ease;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.navbar.scrolled {
  padding: 0.85rem 0;
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  border-bottom-color: rgba(66, 184, 131, 0.2);
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
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

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.25s ease;
  position: relative;
}

.nav-links a:hover {
  color: #42b883;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-outline-nav {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #f8fafc;
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}

.btn-outline-nav:hover {
  border-color: #42b883;
  color: #42b883;
}

.btn-primary-nav {
  background: linear-gradient(135deg, #42b883, #33a06f);
  border: none;
  color: #0f172a;
  padding: 0.65rem 1.35rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(66, 184, 131, 0.3);
  transition: all 0.25s ease;
  font-family: inherit;
}

.btn-primary-nav:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.5);
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-toggle span {
  width: 25px;
  height: 3px;
  background: #f8fafc;
  border-radius: 3px;
}

@media (max-width: 900px) {
  .nav-links {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    background: #1e293b;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transform: translateY(-150%);
    transition: transform 0.3s ease;
    opacity: 0;
    pointer-events: none;
  }

  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .mobile-toggle {
    display: flex;
  }

  .btn-outline-nav {
    display: none;
  }
}
</style>
