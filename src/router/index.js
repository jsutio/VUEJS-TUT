import { createWebHistory, createRouter } from "vue-router";
import Users from "../App/views/users/Users.vue";
const routes = [
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/users",
        name: "users",
        component: Users
    },
    {
        path: "/products",
        name: "Products",
    }
]
 
const router = createRouter({
    history: createWebHistory(),
    routes,
});
 
export default router;