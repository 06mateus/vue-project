import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import UsuariosView from '../views/UsuariosView.vue'
import ConfiguracoesView from '@/views/ConfiguracoesView.vue'

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
      path: '/users',
      name: 'users',
      component: UsuariosView,
    },
    {
      path: '/configs',
      name: 'configs',
      component: ConfiguracoesView,
    },
  ],
})

export default router