<template>
  <div class="main-app">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Hero Section Component -->
    <HeroSection @search="handleHeroSearch" />

    <!-- Buyer / Seller Selection Component -->
    <RoleSelector @role-change="handleRoleChange" />

    <!-- Services Component -->
    <ServicesSection />

    <!-- Footer Component -->
    <FooterSection />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import RoleSelector from './components/RoleSelector.vue'
import ServicesSection from './components/ServicesSection.vue'
import FooterSection from './components/FooterSection.vue'

const handleHeroSearch = (filters) => {
  console.log('Search triggered with filters:', filters)
}

const handleRoleChange = (role) => {
  console.log('Active user role switched to:', role)
}
</script>

<style scoped>
.main-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
