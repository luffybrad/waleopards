<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import { supabase } from '@/lib/supabaseClient';

const route = useRoute();
const productsStore = useProductsStore();
const product = ref(null);
const loading = ref(true);

onMounted(async () => {
  const productId = Number(route.params.id);
  if (productId) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;
      product.value = data;
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      loading.value = false;
    }
  }
});

const getImageUrl = (imagePath: string) => {
  return supabase.storage
    .from('product_images')
    .getPublicUrl(imagePath).data.publicUrl;
};
</script>

<template>
  <v-container v-if="loading" class="text-center">
    <v-progress-circular indeterminate color="pink"></v-progress-circular>
  </v-container>
  <v-container v-else-if="product">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          :src="getImageUrl(product.image)"
          aspect-ratio="1"
          class="rounded-lg"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="text-h3 mb-4">{{ product.name }}</h1>
        <v-chip class="mb-4" color="pink" variant="outlined">
          {{ product.category }}
        </v-chip>
        <p class="text-h5 mb-4">Ksh {{ product.price }}</p>
        <p class="text-body-1 mb-4">{{ product.description }}</p>
        <v-btn color="pink" size="large" class="mt-4">
          Add to Cart
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <h1 class="text-h3 text-center">Product not found</h1>
  </v-container>
</template>
