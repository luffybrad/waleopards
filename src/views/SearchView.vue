<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import FeaturedProducts from '@/components/FeaturedProducts.vue';

const route = useRoute();
const productsStore = useProductsStore();
const searchQuery = ref(route.query.q?.toString() || '');
const loading = ref(false);

const performSearch = async () => {
  if (searchQuery.value.trim()) {
    loading.value = true;
    try {
      await productsStore.searchProducts(searchQuery.value);
      if (productsStore.searchResults.length === 0) {
        console.log('No results found for:', searchQuery.value);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      loading.value = false;
    }
  }
};

// Watch for changes in route query
watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery) {
      searchQuery.value = newQuery.toString();
      performSearch();
    }
  },
  { immediate: true }
);
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="searchQuery"
          label="Search products"
          variant="outlined"
          clearable
          append-inner-icon="mdi-magnify"
          @keyup.enter="performSearch"
          @click:clear="searchQuery = ''"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="pink"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <h2 v-if="searchQuery" class="text-h4 mb-4">
          Search results for "{{ searchQuery }}"
        </h2>
        <v-alert
          v-if="!loading && productsStore.searchResults.length === 0"
          type="info"
          variant="tonal"
        >
          No products found matching your search.
        </v-alert>
        <FeaturedProducts :products="productsStore.searchResults" />
      </v-col>
    </v-row>
  </v-container>@s
</template>
