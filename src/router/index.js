// Default
import { createWebHistory, createRouter } from "vue-router";
//Pages
import Home from '../views/Home.vue'
const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    { 
      path: "/404",
      name: "NotFoundPage",
      component: () => import(/* webpackChunkName: "NotFound" */ '../views/404.vue')
    },
    {
      path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
      redirect: '/404',
    },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: function (to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else {
      window.scrollTo(0, 0);
    }
 }
});
export default router;