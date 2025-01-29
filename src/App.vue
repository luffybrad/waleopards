<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import AppFooter from '@/components/AppFooter.vue'
//supabase
import { supabase } from '@/lib/supabaseClient'

import { ref } from 'vue';


const products = ref([]);

</script>

<template>
  <v-app>
    <AppBar />
    <v-main class="">
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>

</template>

<style scoped>

</style>
