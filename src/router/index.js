import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // Navigation Guard for route protection
  // Router.beforeEach((to, from, next) => {
  //   const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists in localStorage
  //   if (!isAuthenticated && to.name != 'login') {
  //     console.log('sadasda');
  //     next('/login'); 
  //   } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
  //     console.log('sadasda123');

  //     next('/login'); // Redirect to login if not authenticated
  //   } else {
  //     next(); // Continue to the route
  //   }
  // });

  return Router
})
