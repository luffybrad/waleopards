<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { supabase } from '@/lib/supabaseClient';

// Add proper typing for product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  sale?: boolean;
  discount?: number;
  quantity: number;
}

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const cartStore = useCartStore();
const whatsappNumber = '+254720000000'; // Replace with your actual WhatsApp number

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
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

const formatWhatsAppMessage = () => {
  let message = '*New Order*\n\n';
  message += '*Order Details:*\n';
  cartStore.items.forEach((item: Product) => {
    const itemPrice = item.sale && item.discount
      ? item.price - item.discount
      : item.price;
    const subtotal = itemPrice * item.quantity;

    message += `\n📦 *${item.name}*\n`;
    message += `   Quantity: ${item.quantity}\n`;
    if (item.sale && item.discount) {
      message += `   Original Price: ${formatCurrency(item.price)}\n`;
      message += `   Discounted Price: ${formatCurrency(itemPrice)}\n`;
    } else {
      message += `   Price: ${formatCurrency(itemPrice)}\n`;
    }
    message += `   Subtotal: ${formatCurrency(subtotal)}\n`;
  });
  message += `\n*Total: ${formatCurrency(cartStore.totalPrice)}*\n`;
  return encodeURIComponent(message);
};

const checkout = () => {
  if (cartStore.items.length === 0) return;

  const message = formatWhatsAppMessage();
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  dialog.value = false;
  cartStore.clearCart();
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="700px">
    <v-card>
      <v-card-title class="text-h5 bg-pink text-white pa-4">
        Shopping Cart
        <v-btn icon variant="text" @click="dialog = false" class="float-right">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-4">
        <div v-if="cartStore.items.length === 0" class="text-center pa-4">
          Your cart is empty
        </div>

        <v-list v-else>
          <v-list-item v-for="item in cartStore.items" :key="item.id" class="mb-2">
            <template v-slot:prepend>
              <v-avatar size="64" rounded>
                <v-img :src="getImageUrl(item.image)" cover></v-img>
              </v-avatar>
            </template>

            <v-list-item-title class="font-weight-bold">{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <template v-if="item.sale && item.discount">
                <span class="text-decoration-line-through me-2">Ksh {{ item.price }}</span>
                <span class="text-pink">Ksh {{ item.price - item.discount }}</span>
              </template>
              <template v-else>
                Ksh {{ item.price }}
              </template>
            </v-list-item-subtitle>

            <template v-slot:append>
              <div class="d-flex align-center">
                <v-btn icon size="small" @click="cartStore.updateQuantity(item.id, item.quantity - 1)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span class="mx-2">{{ item.quantity }}</span>
                <v-btn icon size="small" @click="cartStore.updateQuantity(item.id, item.quantity + 1)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn icon color="red" size="small" class="ml-2" @click="cartStore.removeFromCart(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="my-4"></v-divider>

        <div class="d-flex justify-space-between align-center">
          <span class="text-h6">Total:</span>
          <span class="text-h6">Ksh {{ cartStore.totalPrice }}</span>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="text" @click="dialog = false">
          Continue Shopping
        </v-btn>
        <v-btn
          color="pink"
          @click="checkout"
          :disabled="cartStore.items.length === 0"
        >
          Checkout via WhatsApp
          <v-icon right>mdi-whatsapp</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
