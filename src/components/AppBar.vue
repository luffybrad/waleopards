<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/assets/images/waleopardlogo.jpeg';
import { useProductsStore } from '@/stores/products';
import { supabase } from '@/lib/supabaseClient';

const router = useRouter();
const drawer = ref(false);
const searchOverlay = ref(false);
const searchQuery = ref('');
const suggestions = ref([]);
const productsStore = useProductsStore();

const items = [
  { title: 'Home', route: '/', icon: 'mdi-home' },
  { title: 'Products', route: '/products', icon: 'mdi-shopping' },
  { title: 'Categories', route: '/categories', icon: 'mdi-shape' },
  { title: 'Deals', route: '/sales', icon: 'mdi-sale' },
];

// Watch for changes in search query
watch(searchQuery, async (newQuery) => {
  if (newQuery.trim().length > 0) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, image, category')
        .ilike('name', `%${newQuery}%`)
        .limit(5);

      if (error) throw error;
      suggestions.value = data || [];
    } catch (error) {
      console.error('Search error:', error);
      suggestions.value = [];
    }
  } else {
    suggestions.value = [];
  }
});

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } });
    searchOverlay.value = false;
    searchQuery.value = '';
    suggestions.value = [];
  }
};

const selectSuggestion = (product) => {
  router.push({ name: 'product', params: { id: product.id } });
  searchOverlay.value = false;
  searchQuery.value = '';
  suggestions.value = [];
};

const getImageUrl = (imagePath: string) => {
  return supabase.storage
    .from('product_images')
    .getPublicUrl(imagePath).data.publicUrl;
};
</script>

<template>
  <v-app-bar color="white" elevation="3" class="px-4">
    <!-- Left Section -->
    <div class="d-flex align-center">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="text-pink"
      ></v-app-bar-nav-icon>
      <v-avatar :image="logo" rounded size="40" class="mr-2"></v-avatar>
      <v-toolbar-title class="text-h5 text-pink font-weight-bold">
        Waleopard
      </v-toolbar-title>
    </div>

    <!-- Center Section -->
    <v-spacer></v-spacer>

    <!-- Right Section -->
    <div class="d-flex align-center">
      <v-btn
        icon
        @click="searchOverlay = true"
        class="text-pink mr-2"
        size="small"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn
        icon
        class="text-pink"
        size="small"
      >
        <v-badge color="pink" :content="8">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </div>
  </v-app-bar>

  <!-- Navigation Drawer -->
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

  <!-- Search Overlay -->
  <v-overlay v-model="searchOverlay" class="d-flex justify-center align-center" scrim="black">
    <v-card class="pa-5" :width="$vuetify.display.smAndDown ? '90%' : '600'">
      <v-card-title class="text-h5 mb-4">Search Products</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="searchQuery"
          clearable
          append-inner-icon="mdi-magnify"
          label="What are you looking for?"
          single-line
          variant="outlined"
          density="comfortable"
          autofocus
        ></v-text-field>

        <v-list v-if="suggestions.length > 0" class="mt-3">
          <v-list-item
            v-for="product in suggestions"
            :key="product.id"
            @click="selectSuggestion(product)"
            class="mb-2 rounded-lg"
            variant="tonal"
          >
            <template v-slot:prepend>
              <v-avatar
                :image="getImageUrl(product.image)"
                size="48"
                class="me-3"
                rounded
              ></v-avatar>
            </template>
            <v-list-item-title class="font-weight-medium">
              {{ product.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ product.category }}
            </v-list-item-subtitle>
            <template v-slot:append>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
        </v-list>

        <div class="d-flex justify-end gap-2 mt-4">
          <v-btn
            @click="searchOverlay = false"
            variant="tonal"
          >
            Close
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<style scoped>
.v-app-bar {
  padding: 0 16px;
}

.v-toolbar-title {
  white-space: nowrap;
}
</style>
