import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/home.vue";
import List from "@/pages/list.vue";
import AddLink from "@/pages/add-link.vue";

const routes: RouteRecordRaw[] = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "list",
    path: "/list",
    component: List,
  },
  {
    name: "add-link",
    path: "/add-link",
    component: AddLink,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
