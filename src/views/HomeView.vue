<script setup lang="ts">
import CarouselBanner from '@/components/CarouselBanner.vue'
import CategoriesCard from '@/components/CategoriesCard.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';

const productStore = useProductsStore();
const { products } = storeToRefs(productStore);
</script>

<template>
    <CarouselBanner />
    <span class="d-flex text-h4 font-weight-bold justify-center ma-10">Categories</span>
    <CategoriesCard />
    <span class="d-flex text-h4 font-weight-bold justify-center ma-10">Featured Products</span>
  <FeaturedProducts :products="products"/>
</template>
