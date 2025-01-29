<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
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
const products = ref<Product[]>([]);
const categories = ref(['Fashion', 'Natural Oil', 'Paint Gallery', 'Book']);
const search = ref('');
const onSale = ref(false);
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const loading = ref(false);

const headers = ref([
  { title: '#', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Description', key: 'description' },
  { title: 'Price', key: 'price' },
  { title: 'Image', key: 'image' },
  { title: 'Sale', key: 'sale' },
  { title: 'Discount', key: 'discount' },
  { title: 'Action', key: 'actions', sortable: false },
]);


const editedProduct = reactive<Product>({
  id: undefined,
  name: '',
  category: '',
  description: '',
  price: 0,
  image: '',
  sale: false,
  discount: 0,
});
const defaultProduct = reactive<Product>({
  id: undefined,
  name: '',
  category: '',
  description: '',
  price: 0,
  image: '',
  sale: false,
  discount: 0,
});

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Product' : `Edit ${editedProduct.name}`;
});


watch(dialog, (val) => {
  if (!val) {
    close();
  }
});

watch(dialogDelete, (val) => {
  if (!val) {
    closeDelete();
  }
});


const initialize = async() => {
  const { data, error } = await supabase.from('products').select('*');
  if(data){
    products.value = data
  }
  if (error) {
      console.error('Error fetching products:', error);
    }
  };


const editProduct = (item: Product) => {
    editedIndex.value = products.value.indexOf(item)
    Object.assign(editedProduct, item);
  dialog.value = true;
};


const deleteProduct = (item: Product) => {
    editedIndex.value = products.value.indexOf(item);
  Object.assign(editedProduct, item);
  dialogDelete.value = true;
};


const deleteProductConfirm = async () => {
  loading.value = true;
  try {
    if (editedIndex.value > -1 && editedProduct.id) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', editedProduct.id);
      if (error) {
        console.error('Error deleting the product', error);
        return;
      }
       products.value = products.value.filter(
            (product) => product.id !== editedProduct.id
      );
    }
  } catch (error) {
    console.error('Error during delete operation', error);
  } finally {
    loading.value = false;
    closeDelete();
  }
};



const closeDelete = async() => {
  dialogDelete.value = false
  await nextTick();
  Object.assign(editedProduct, defaultProduct)
  editedIndex.value = -1
}


const save = async () => {
    loading.value = true;
    try {
        if (editedIndex.value > -1 && editedProduct.id) {
            const { error } = await supabase
                .from('products')
                .update({...editedProduct})
                .eq('id', editedProduct.id);

            if (error) {
                console.error('Error updating product', error);
                return;
            }
                products.value = products.value.map(item =>
                item.id === editedProduct.id ? {...editedProduct} : item
            )
        } else {
          const newProduct = {
             name: editedProduct.name,
             category: editedProduct.category,
             description: editedProduct.description,
             price: editedProduct.price,
             image: editedProduct.image,
              sale: editedProduct.sale,
              discount: editedProduct.discount,
          }
            const { error, data } = await supabase
                .from('products')
                .insert([newProduct])
                .select('id');

            if (error) {
                console.error('Error inserting new product', error);
                return;
            }
            if(data && data[0] && data[0].id)
            {
                products.value.push({...newProduct, id:data[0].id});
                Object.assign(editedProduct, {...defaultProduct, id: undefined});
            } else{
                console.error('Error inserting new product. Id not found in data', data)
            }
        }
    } catch (error) {
        console.error('Error during save operation', error);
    } finally {
        loading.value = false;
        close();
    }
};

 const close = () => {
  dialog.value = false;
  Object.assign(editedProduct, {...defaultProduct, id: undefined});
  editedIndex.value = -1;
};



onMounted(() => {
    initialize();
});
</script>


<template>
  <v-card class="container" color="pink" variant="tonal">
    <v-card-title>Products</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        class="mb-3"
        hide-details
        single-line
        density="compact"
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        density="compact"
        :sort-by="[{ key: 'id', order: 'desc' }]"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn
                  color="pink"
                  v-bind="props"
                  prepend-icon="mdi-plus"
                  elevation="2"
                  size="small"
                  class="rounded-xl"
                >
                  Add product
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedProduct.name"
                          label="Name"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-combobox
                          v-model="editedProduct.category"
                          auto-select-first
                          clearable
                          chips
                          label="Category"
                          :items="categories"
                          variant="outlined"
                        ></v-combobox>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="editedProduct.description"
                          variant="outlined"
                          counter
                          clearable
                          label="Description"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12">
                            <v-file-upload
                            @change="handleFileUpload"
                            browse-text="Browse Image"
                            divider-text="Or"
                            title="Drop image"
                            icon="mdi-upload"
                            class="rounded-xl"
                            rounded
                            show-size
                            multiple
                            clearable
                            density="compact"
                        >
                        </v-file-upload>
                             <v-img v-if="editedProduct.image" :src="supabase.storage.from('product_images').getPublicUrl(editedProduct.image).data.publicUrl"
                            max-height="100px" max-width="100px"
                             />
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model.number="editedProduct.price"
                          variant="outlined"
                          type="number"
                          label="Price"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-row>
                          <v-col>
                            <v-switch
                              v-model="editedProduct.sale"
                              color="pink"
                              label="Sale"
                              density="compact"
                              hide-details
                            ></v-switch>
                          </v-col>
                          <v-col v-if="editedProduct.sale">
                            <v-text-field
                              v-model.number="editedProduct.discount"
                              variant="outlined"
                              type="number"
                              label="Discount"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="pink" variant="text" @click="close">Cancel</v-btn>
                  <v-btn
                    color="pink"
                    variant="text"
                    @click="save"
                    :loading="loading"
                  >Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">
                  Confirm deleting product: {{ editedProduct.name }}?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="pink" variant="text" @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="pink" variant="text" @click="deleteProductConfirm" :loading="loading"
                    >Delete</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon size="small" @click="editProduct(item)"> mdi-pencil </v-icon>
          <v-icon size="small" @click="deleteProduct(item)"> mdi-delete </v-icon>
        </template>

          <!--category checkbox display-->
          <template v-slot:item.sale="{ item }">
              <v-checkbox-btn
                v-model="item.sale"
                readonly
              ></v-checkbox-btn>
          </template>

        <template v-slot:item.category="{ item }">
          <v-chip> {{ item.category }} </v-chip>
        </template>
         <template v-slot:item.image="{ item }">
             <v-img v-if="item.image" :src="supabase.storage.from('product_images').getPublicUrl(item.image).data.publicUrl"
                    max-height="50px" max-width="50px"
             />
        </template>
        <template v-slot:no-data>
            <v-btn
                color="pink"
                @click="initialize()"
                 :loading="loading"
            >
                Reset
            </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
