<template>
	<div class="main-app">
	    <!-- Navbar Component -->
	    <Navbar />
	
	    <!-- Hero Section Component -->
	    <HeroSection @search="handleHeroSearch" />
	
	    <!-- Buyer / Seller Selection Component -->
	    <RoleSelector @role-change="handleRoleChange" />
	
	    <!-- Featured Cars Component -->
	    <FeaturedCars ref="carsRef" />
	
	    <!-- Services Component -->
	    <ServicesSection />
	
	    <!-- Footer Component -->
	    <FooterSection />
	  </div>
</template>

<script setup lang="ts">
defineProps<{
	handleHeroSearch: (filters: any) => void;
	handleRoleChange: (role: any) => void;
}>()
</script>
