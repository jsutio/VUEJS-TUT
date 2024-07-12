<script setup>
import Main from './App/Main.vue';
import Login from './App/views/login/Login.vue';
import { useAuthStore } from "./store/AuthStore";
import { storeToRefs } from 'pinia';
import { onMounted } from "vue";
import router from "./router";
 
 
const AuthStore = useAuthStore();
const { loggedIn } = storeToRefs(AuthStore);
 
async function handlesCheckToken(){
  await AuthStore.checkToken();
}
onMounted(async () => {
 
  await handlesCheckToken();
 
})
</script>

<template>
   <Main v-if="loggedIn" />
   <login v-else />
</template>