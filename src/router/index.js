import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import UsuariosView from '../views/configs/UsuariosView.vue'
import ConfEnterprise from '../views/configs/ConfEnterprise.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'inicio',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'sobre',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contato',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/config/usuario',
      name: 'users',
      component: UsuariosView,
    },
    {
      path: '/config/empresa',
      name: 'enterprise',
      component: ConfEnterprise,
    }
  ],
})

export default router