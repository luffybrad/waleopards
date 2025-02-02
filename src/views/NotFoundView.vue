<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goHome = () => router.push('/');
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="text-center">
        <v-icon size="128" color="pink">mdi-alert-circle-outline</v-icon>
        <h1 class="text-h2 mt-4">404 - Page Not Found</h1>
        <p class="text-body-1 mt-4">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <v-btn
          color="pink"
          variant="flat"
          size="large"
          class="mt-6"
          @click="goHome"
        >
          <v-icon left>mdi-home</v-icon>
          Go to Home
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
