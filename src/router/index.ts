/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  createRouter,
  createWebHistory
} from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL
  ),
  extendRoutes: (routes) => [
    // {
    //   path: '/',
    //   // redirect: () => {
    //   //   return '/onboard/landing'
    //   // }

    //   // redirect: to => {
    //   //   const authStore = useAuthStore()
    //   //   const { isLogged } = storeToRefs(authStore)

    //   //   return isLogged.value ?
    //   //     { name: 'home' } :
    //   //     { name: 'login', query: to.query }
    //   // },
    // },
    
    ...setupLayouts(routes)
  ]
})

export default router
