<script setup lang="ts">
import { onMounted, ref } from 'vue'

const valid = ref(true)
const username = ref('')


</script>



<template>
  <div>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card variant="outlined" class="rounded-xl text-pink" >
          <v-card-title>
            <span class="text-h5">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="valid = false">
              <v-text-field
                v-model="valid"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="valid"
                label="Username"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="valid"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn
                color="pink"
                type="submit"
                class="mb-5"
              >
                Sign Up
              </v-btn>


              <v-divider class="border-opacity-100" thickness="2" color="pink" >Or</v-divider>




              <div id="g_id_onload"
                  data-client_id="1037125968222-khj8fmihvvafmv17kc6fgka5kf9dobn0.apps.googleusercontent.com"
                  data-context="signin"
                  data-ux_mode="popup"
                  data-login_uri="http://localhost:5173/"
                  data-itp_support="true">
              </div>

              <div class="g_id_signin"
                  data-type="standard"
                  data-shape="pill"
                  data-theme="outline"
                  data-text="continue_with"
                  data-size="large"
                  data-logo_alignment="left">
              </div>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>



  </v-container>

</div>

</template>

<style>
/* Add any necessary styles */
#g_id_onload, .g_id_signin {
  display: block;
  margin: 20px auto;
}
</style>
