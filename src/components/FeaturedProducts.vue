<script setup lang="ts">
import logo from '@/assets/images/waleopardlogo.jpeg';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const cartStore = useCartStore();

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  sale: boolean;
  discount: number;
}

const props = defineProps<{
  products: Product[]
}>();

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return logo;
  return supabase.storage
    .from('product_images')
    .getPublicUrl(imagePath).data.publicUrl;
};

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0
  });
};

const navigateToProduct = (productId: number) => {
  if (!productId) return;
  router.push({ name: 'product', params: { id: productId.toString() } });
};

const addToCart = (product: Product, event: Event) => {
  event.stopPropagation(); // Prevent navigation when clicking the add to cart button
  if (!product.id) return;

  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    sale: product.sale,
    discount: product.discount
  });
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="product in props.products"
        :key="product.id"
        xxl="3"
        xl="4"
        md="4"
        sm="6"
      >
        <v-card
          class="rounded-xl mb-5 product-card"
          elevation="10"
          @click="navigateToProduct(product.id)"
          style="cursor: pointer;"
        >
          <div v-if="product.sale" class="sale-overlay">
            On Sale
          </div>
          <v-img
            :src="getImageUrl(product.image)"
            cover
            height="300"
            :alt="product.name"
          ></v-img>

          <v-card-title>
            <span class="text-pink text-h5">{{ product.name }}</span>
          </v-card-title>

          <v-card-subtitle class="text-h6">
            <div class="d-flex justify-space-between text-pink align-center">
              <v-chip
                variant="outlined"
                size="small"
                class="pink rounded-xl"
                density="comfortable"
              >
                {{ product.category }}
              </v-chip>

              <v-rating
                length="5"
                size="x-small"
                disabled
                model-value="4"
                color="pink"
                active-color="pink"
                density="compact"
              />
            </div>

            <div class="text-pink mt-2">
              <template v-if="product.sale && product.discount">
                <div class="d-flex justify-space-between">
                  <span class="font-weight-bold">
                    {{ formatCurrency(product.price - product.discount) }}
                  </span>
                  <span class="text-decoration-line-through text-subtitle-2">
                    {{ formatCurrency(product.price) }}
                  </span>
                </div>
              </template>
              <template v-else>
                {{ formatCurrency(product.price) }}
              </template>
            </div>
          </v-card-subtitle>

          <v-card-text class="text-body-1">
            {{ product.description }}
          </v-card-text>

          <v-card-actions>
            <v-row>
              <v-col cols="12" class="d-flex justify-space-between">
                <v-btn
                  class="rounded-xl bg-pink"
                  density="comfortable"
                  @click="(e) => addToCart(product, e)"
                >
                  Add to Cart
                  <v-icon class="ml-2">mdi-cart</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.product-card{
    position: relative;
}
.sale-overlay {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(255, 0, 100, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: bold;
    z-index: 1;
}
</style>
