<script setup lang="ts">
import FeaturedProducts from '@/components/FeaturedProducts.vue';
import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

const productStore = useProductsStore();
const { products } = storeToRefs(productStore);

// Filter state
const searchQuery = ref('');
const selectedCategory = ref('');
const priceRange = ref([0, 10000]);
const sortBy = ref('default');

// Computed properties
const filteredProducts = computed(() => {
  let filtered = [...products.value];

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product =>
      product.category === selectedCategory.value
    );
  }

  // Filter by price range
  filtered = filtered.filter(product =>
    product.price >= priceRange.value[0] && product.price <= priceRange.value[1]
  );

  // Sorting
  switch (sortBy.value) {
    case 'priceLowHigh':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'priceHighLow':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered.sort((a, b) => b.id - a.id);
      break;
    case 'default':
    default:
      // Keep original order
      break;
  }

  return filtered;
});

const categories = computed(() => {
  const uniqueCategories = new Set(products.value.map(p => p.category));
  return Array.from(uniqueCategories);
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-card class="pa-4 rounded-lg" elevation="2">
          <v-card-title class="text-h6 text-pink">Filters</v-card-title>

          <!-- Search -->
          <v-text-field
            v-model="searchQuery"
            label="Search products"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          ></v-text-field>

          <!-- Category Filter -->
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Category"
            variant="outlined"
            density="comfortable"
            clearable
            class="mb-4"
          ></v-select>

          <!-- Price Range -->
          <v-range-slider
            v-model="priceRange"
            :max="10000"
            :min="0"
            label="Price range"
            thumb-label="always"
            color="pink"
            class="mb-4"
          ></v-range-slider>

          <!-- Sort By -->
          <v-select
            v-model="sortBy"
            :items="[
              { value: 'default', text: 'Default' },
              { value: 'priceLowHigh', text: 'Price: Low to High' },
              { value: 'priceHighLow', text: 'Price: High to Low' },
              { value: 'newest', text: 'Newest First' }
            ]"
            label="Sort by"
            variant="outlined"
            density="comfortable"
          ></v-select>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-card class="pa-4 rounded-lg" elevation="2">
          <v-card-title class="text-h4 text-pink font-weight-bold mb-4">
            All Products
            <v-chip class="ml-2" color="pink" variant="outlined">
              {{ filteredProducts.length }} items
            </v-chip>
          </v-card-title>

          <FeaturedProducts :products="filteredProducts"/>
        </v-card>
      </v-col>
    </v-row>

    <v-fab
      app
      rounded
      variant="plain"
      location="bottom"
      size="x-large"
      class="rounded-xl"
      fixed
    >
      <v-btn
        icon="mdi-arrow-up-circle"
        class="ma-0 pa-0"
        color="pink"
        size="large"
        href="#top"
      ></v-btn>
    </v-fab>
  </v-container>
</template>
<style scoped>
</style>
