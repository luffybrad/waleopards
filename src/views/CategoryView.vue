<script setup lang="ts">
import CategoriesCard from '@/components/CategoriesCard.vue';
</script>

<template>
  <span class="d-flex text-h4 font-weight-bold justify-center ma-10" id="top">All Categories</span>

  <v-fab app
  rounded variant="plain"
 location="bottom" size="x-large" class="rounded-xl"  fixed>

  <v-btn icon="mdi-arrow-up-circle" class="ma-0 pa-0" color="pink"
  size="large"
  href="#top">
  </v-btn>

  </v-fab>

  <CategoriesCard/>
</template>
<style scoped>
</style>
