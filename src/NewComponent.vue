<template>
  <div class="main-app">

    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <HeroSection @search="handleHeroSearch" />

    <!-- Buyer / Seller Selection -->
    <RoleSelector @role-change="handleRoleChange" />

    <!-- Services -->
    <ServicesSection />

    <!-- Footer -->
    <FooterSection />

  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import RoleSelector from './components/RoleSelector.vue'
import ServicesSection from './components/ServicesSection.vue'
import FooterSection from './components/FooterSection.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

function handleHeroSearch() {
  router.push('/cars')
}

function handleRoleChange(role) {
  if (role === 'seller') {
    router.push('/seller-dashboard')
  } else {
    router.push('/cars')
  }
}
</script>