<script setup lang="ts">
import FeaturedProducts from '@/components/FeaturedProducts.vue';
import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';

const productStore = useProductsStore();
const { productsOnSale } = storeToRefs(productStore);
</script>

<template>
  <span class="d-flex text-h4 font-weight-bold justify-center ma-10" id="top">Grab A Deal!</span>

  <v-fab app
  rounded variant="plain"
 location="bottom" size="x-large" class="rounded-xl"  fixed>

  <v-btn icon="mdi-arrow-up-circle" class="ma-0 pa-0" color="pink"
  size="large"
  href="#top">
  </v-btn>

  </v-fab>

  <FeaturedProducts :products="productsOnSale"/>
</template>
<style scoped>
</style>
