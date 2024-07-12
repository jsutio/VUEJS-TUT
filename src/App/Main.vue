<script setup>
import { ref } from 'vue'
import Sidebar from './Components/sidebar/Sidebar.vue';
import { useAuthStore } from '../store/AuthStore';

const AuthStore = useAuthStore();
const drawer = ref(null)

async function handlesLogout(){
await AuthStore.logOut();

}
</script>


<template>
   <v-app id="inspire">
     <v-navigation-drawer v-model="drawer">
       <Sidebar />
     </v-navigation-drawer>
 
     <v-app-bar>
       <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
 
       <v-app-bar-title>Application</v-app-bar-title>
       <v-spacer></v-spacer>
       <v-btn prepend-icon="mdi-logout" @click="handlesLogout()">
        Logout
  
      </v-btn>
     </v-app-bar>

     <v-main>
       <router-view />
     </v-main>
   </v-app>
 </template>

 <script>
   export default {
     data: () => ({ drawer: null }),
   }
 </script>