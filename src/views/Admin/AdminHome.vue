<script setup lang="ts">
import ProductItems from '@/components/ProductItems.vue';
import { ref } from 'vue'

const cards = ['Today', 'Yesterday']
const links = ref([
  {icon: 'mdi-view-list',name: 'All'},
  {icon:'mdi-plus', name:'Add'},
  {icon: 'mdi-pencil', name: 'Edit'},
  {icon: 'mdi-delete', name: 'Delete'},
])

const drawer = ref(null)

const tab = ref('All')

</script>




<template>
  <v-card>
    <v-toolbar color="pink" title="Admin Dashboard">
    </v-toolbar>

    <ProductItems/>
  </v-card>
</template>


<style scoped>
</style>
