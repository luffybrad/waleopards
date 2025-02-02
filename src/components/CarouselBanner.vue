<script setup lang="ts">
import { ref } from 'vue'

const slides = ref([
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    title: 'New Arrivals',
    subtitle: 'Discover our latest collection',
    buttonText: 'Shop Now',
    color: 'pink'
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off selected items',
    buttonText: 'Explore Deals',
    color: 'pink'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    title: 'Limited Edition',
    subtitle: 'Exclusive designs just for you',
    buttonText: 'View Collection',
    color: 'pink'
  }
])
</script>

<template>
  <v-sheet class="mb-6 rounded-xl">
    <v-carousel
      show-arrows="hover"
      cycle
      hide-delimiter-background
      height="500"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.image"
        cover
      >
        <v-sheet
          :color="slide.color"
          height="100%"
          class="d-flex align-center justify-center"
          style="background: rgba(0, 0, 0, 0.4)"
        >
          <div class="text-center pa-4">
            <h1 class="text-h2 text-white font-weight-bold mb-4">
              {{ slide.title }}
            </h1>
            <p class="text-h5 text-white mb-6">
              {{ slide.subtitle }}
            </p>
            <v-btn
              color="white"
              variant="outlined"
              size="x-large"
              class="rounded-pill"
            >
              {{ slide.buttonText }}
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-sheet>
</template>
  <style scoped></style>
