<template>
  <div class="main-app">
    <Navbar />

    <HeroSection @search="handleHeroSearch" />

    <RoleSelector @role-change="handleRoleChange" />

    <ServicesSection />

    <FooterSection />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import RoleSelector from '../components/RoleSelector.vue'
import ServicesSection from '../components/ServicesSection.vue'
import FooterSection from '../components/FooterSection.vue'

const router = useRouter()

const handleHeroSearch = (filters) => {
  console.log('Search triggered with filters:', filters)

  router.push({
    path: '/cars',
    query: filters
  })
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