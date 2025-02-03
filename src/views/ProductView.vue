<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '@/lib/supabaseClient';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const cartStore = useCartStore();

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

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      sale: product.value.sale,
      discount: product.value.discount
    });
  }
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
        <div class="price-section">
          <template v-if="product?.sale && product?.discount">
            <span class="text-h4 text-decoration-line-through me-2">Ksh {{ product.price }}</span>
            <span class="text-h4 text-pink">Ksh {{ product.price - product.discount }}</span>
          </template>
          <template v-else>
            <span class="text-h4">Ksh {{ product?.price }}</span>
          </template>
        </div>
        <p class="text-body-1 mb-4">{{ product.description }}</p>
        <v-btn color="pink" size="large" class="mt-4" @click="addToCart">
          Add to Cart
          <v-icon right>mdi-cart</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <h1 class="text-h3 text-center">Product not found</h1>
  </v-container>
</template>
