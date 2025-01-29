<script setup lang="ts">
import { ref } from 'vue';
import logo from '@/assets/images/waleopardlogo.jpeg';

const drawer = ref(false);
const searchOverlay = ref(false);
const searchQuery = ref('');

const items = [
  { title: 'Home', route: '/', icon: 'mdi-home' },
  { title: 'Products', route: '/products', icon: 'mdi-shopping' },
  { title: 'Categories', route: '/categories', icon: 'mdi-shape' },
  { title: 'Deals', route: '/sales', icon: 'mdi-sale' },
  { title: 'New Arrivals', route: '/new-arrivals', icon: 'mdi-new-box' },
];
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    class="text-pink rounded"
  >
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        :prepend-avatar="logo"
        title="Waleopard"
        subtitle="Quality meets style"
      ></v-list-item>
    </template>

    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.route"
        :prepend-icon="item.icon"
        variant="tonal"
        class="rounded-xl"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      class="text-pink"
    ></v-app-bar-nav-icon>
    <v-avatar :image="logo" rounded size="large"></v-avatar>
    <v-spacer></v-spacer>
    <v-btn icon @click="searchOverlay = true">
      <v-icon class="text-pink">mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-badge color="pink" :content="8">
        <v-icon class="text-pink">mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>

  <v-overlay v-model="searchOverlay" class="d-flex justify-center align-center">
    <v-card class="pa-5" :width="$vuetify.display.smAndDown ? '200' : '400'"
   >
    <v-card-text>
      <v-text-field
        v-model="searchQuery"
        clearable
        append-inner-icon="mdi-magnify"
        label="Search Products"
        single-line
        variant="outlined"
        density="comfortable"
      ></v-text-field>
        <v-btn @click="searchOverlay = false" class="mt-3">Close</v-btn>
    </v-card-text>
    </v-card>
  </v-overlay>
</template>

<style scoped>
/* Add any additional styles here */
</style>
