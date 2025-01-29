<script setup lang="ts">
import { ref, computed } from 'vue';
import logo from '@/assets/images/waleopardlogo.jpeg';
import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';

const productStore = useProductsStore();
const { products, loading, error } = storeToRefs(productStore);

const categoriesWithCounts = computed(() => {
  if (!products.value) {
    return [];
  }

  const categoryCounts = products.value.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as { [category: string]: number });

  return Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));
});
</script>

<template>
  <v-container fluid class="mb-3">
        <div v-if="loading">Loading categories...</div>
    <div v-else-if="error">{{ error }}</div>
    <v-row v-else>
      <v-col
        v-for="categoryData in categoriesWithCounts"
        :key="categoryData.category"
        xxl="3"
        xl="4"
        md="4"
        sm="6"
      >
        <v-card class="rounded-xl mb-5" elevation="10">
          <v-img :src="logo" cover height="300"></v-img>

          <v-card-title class="text-h5 text-pink">
            {{ categoryData.category }}
          </v-card-title>
          <v-card-subtitle class="text-body-1 mb-3">
            {{ categoryData.count }} product{{
              categoryData.count > 1 ? 's' : ''
            }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
