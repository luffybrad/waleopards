<script setup lang="ts">
import { ref } from 'vue';
import logo from '@/assets/images/waleopardlogo.jpeg'


</script>

<template>
    <hr>
    <v-footer
    class="mt-5"
    >
    <v-row class="d-flex justify-space-evenly">
        <v-col>
            <span class="d-flex justify-space-evenly mb-5">
                <span>
                    <v-avatar class="rounded-xl">
                        <v-img :src="logo" cover></v-img>
                    </v-avatar>
                </span>
                <span class="text-h5 text-pink">
                    Waleopard
                </span>
            </span>
            <span class="text-body-1 mb-10">
                Discover the latest trends in fashion and lifestyle products. Quality meets style at Waleopard.
                
            </span>
                <v-text-field 
                clearable 
                label="Send us an email"
                placeholder="example@gmail.com"
                class="mt-5 pink"
                rounded
                color="pink"
                variant="outlined"
                ></v-text-field>
                <v-btn class="rounded-xl bg-pink">
                    Send
                </v-btn>
      
        </v-col>


        <v-col>
            <span class="d-flex text-h5 text-pink">Shop</span>
            <v-list lines="one">
                <v-list-item>
                    All Products
                </v-list-item>
                <v-list-item>
                    Category    
                </v-list-item>
                <v-list-item>
                    Deals
                </v-list-item>
                <v-list-item>
                    New Arrivals
                </v-list-item>
            </v-list>
        </v-col>

        <v-col>
            <span class="d-flex text-h5 text-pink">Support</span>
            <v-list lines="one">
                <v-list-item>
                    <v-icon size="small">mdi-phone</v-icon>
                    0720-000-000
                </v-list-item>
                <v-list-item>
                    <v-icon size="small">mdi-email</v-icon>
                    example@gmail.com
                </v-list-item>
                <v-list-item>
                    <v-icon size="small">mdi-whatsapp</v-icon>
                    0720-000-000
                </v-list-item>
                <v-list-item>
                    <v-icon size="small">mdi-map-marker</v-icon>
                    Location
                </v-list-item>

            </v-list>
        </v-col>

        <v-col cols="12" class="">
            <v-row class="">
                <v-col class="text-center">
                    <span class="text-body-2">
                &copy; 2021 Waleopard. All rights reserved.
            </span>
                </v-col>
                <v-col class="text-center">
                <span>
                <v-icon class="ma-2 text-pink">
                    mdi-instagram
                </v-icon>
                <v-icon class="ma-2 text-pink">
                    mdi-facebook
                </v-icon>
                <v-icon class="ma-2 text-pink">
                    mdi-whatsapp
                </v-icon>
                </span>
                </v-col>
            </v-row>
        </v-col>

    </v-row>

    </v-footer>
</template>