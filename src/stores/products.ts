import { defineStore } from 'pinia';
import { ref, onMounted, computed } from 'vue';
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

export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const searchQuery = ref(''); // Add this line
    const searchResults = ref<Product[]>([])


    const fetchProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
            const { data, error: fetchError } = await supabase
                .from('products')
                .select('*');

            if (fetchError) {
                console.error('Error fetching products:', fetchError);
                error.value = 'Failed to fetch products.';
                return;
            }
           if(data) {
               products.value = data;
           }
        } catch (e:any) {
            console.error('An unexpected error occured:', e);
            error.value = 'An unexpected error occured';
        } finally {
            loading.value = false;
        }
    };


     const productsOnSale = computed(() => {
        return products.value.filter((product) => product.sale);
    });
     const getProductById = (id:number) => {
      return products.value.find(product => product.id === id)
    }
    const searchProducts = computed(() => {
      if(!searchQuery.value){
          searchResults.value = [];
            return [];
        }

      const results = products.value.filter((product) =>
         product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
         )
            searchResults.value = results;
        return results
     });
     const setSearchQuery = (query:string) => {
         searchQuery.value = query
     }

    onMounted(() => {
        fetchProducts();
    });

    return {
        products,
        loading,
        error,
        fetchProducts,
        productsOnSale,
        getProductById,
        searchProducts,
        setSearchQuery,
        searchResults
    };
});
