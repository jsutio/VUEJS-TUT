import { createWebHistory, createRouter } from "vue-router";
import Login from "../App/views/login/Login.vue";
import Users from "../App/views/users/Users.vue";
import Products from "../App/views/products/Products.vue";
import { components } from "vuetify/dist/vuetify-labs.js";


const routes = [
 
    {
        path: "/",
        name: "Home"
    },
    // {
    //     path: "/Login",
    //     name: "Login",
    //     component: Login
    // },
    {
        path: "/users",
        name: "users",
        component: Users
    },
    {
        path: "/products",
        name: "Products",
        component: Products
    }
]
 
const router = createRouter({
    history: createWebHistory(),
    routes,
});
 
export default router;