<script setup lang="ts">
import { ref } from 'vue';
import logo from '@/assets/images/waleopardlogo.jpeg';
import { supabase } from '@/lib/supabaseClient';


interface Product {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  sale: boolean;
  discount: number;
}
const props = defineProps<{
    products:Product[]
}>()

</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        xxl="3"
        xl="4"
        md="4"
        sm="6"
      >
        <v-card class="rounded-xl mb-5 product-card" elevation="10">
            <div v-if="product.sale" class="sale-overlay">
                On Sale
            </div>
          <v-img
            :src="product.image ? supabase.storage.from('product_images').getPublicUrl(product.image).data.publicUrl : logo"
            cover
            height="300"
          ></v-img>

          <v-card-title class="">
            <span class="text-pink text-h5">{{ product.name }}
            </span>
          </v-card-title>
          <v-card-subtitle class="text-h6">
            <span class="d-flex justify-space-between text-pink">
                <span class="text-caption">
              <v-chip
                variant="outlined"
                size="small"
                class="pink rounded-xl"
                density="comfortable"
              >
                {{ product.category }}
              </v-chip>
            </span>
            <span>
            <v-rating
                  length="5"
                  size="x-small"
                  disabled
                  model-value="4"
                  color="pink"
                  active-color="pink"
                  density="compact"
                />

          </span>

            </span>
            <span class="text-pink">
                <span v-if="product.discount > 0" >
                  <span class="d-flex justify-space-between">
                    <span>
                      Ksh{{ product.price - product.discount }}
                    </span>

                    <span class="text-decoration-line-through text-subtitle-2">Ksh{{ product.price }}</span>
                  </span>
                  </span>
                <span
                v-else
                >
                Ksh{{ product.price }}
                </span>
              </span>
          </v-card-subtitle>

          <v-card-text class="text-body-1">
            <span class="mb-3">
              {{ product.description }}
            </span>


          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12" class="d-flex justify-space-between">
                <v-btn class="d-flex rounded-xl bg-pink"
                density="comfortable"
                >
                  <span>
                    Add to Cart <v-icon> mdi-cart </v-icon>
                  </span>
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
