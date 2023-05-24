import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ArticleView from "../views/ArticleView.vue";
import ProfileView from "../views/ProfileView.vue";
import CategoryView from "../views/CategoryView.vue"
import LoginView from "../views/LoginView.vue"


import SigninView from "../views/SigninView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/articles/:id",
    name: "article",
    component: ArticleView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/category/:id",
    name: "category",
    component: CategoryView,
  },
  {
    path:"/login",
    name:"login",
    component:LoginView
  },
  {
    path:"/signup",
    name:"signup",
    component:SigninView
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Check if the user is authenticated
    const token = localStorage.getItem("token"); // Get the token from localStorage or Vuex store
    if (token) {
      // User is authenticated, allow access
      next();
    } else {
      // User is not authenticated, redirect to login page
      next("/");
    }
  } else {
    // No authentication required for the route, allow access
    next();
  }
});
export default router;
