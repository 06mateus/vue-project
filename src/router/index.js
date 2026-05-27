import { createRouter, createWebHistory } from 'vue-router'
import SiteLayout from '../layouts/SiteLayout.vue' // Importa o layout com menu
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue' // Seu sub-sistema de anexos

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. GRUPO DO SITE PÚBLICO (Com Menu)
    {
      path: '/',
      component: SiteLayout,
      children: [
        {
          path: '', // Fica vazio porque herda o '/' do pai (Página Inicial)
          name: 'home',
          component: HomeView
        },
        {
          path: 'login', // Vai virar '/login' na URL
          name: 'login',
          component: LoginView
        }
      ]
    },

    // 2. ROTA DO SUB-SISTEMA ISOLADO (Sem Menu)
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView // 👈 Carrega direto a tela, sem passar pelo SiteLayout!
    }
  ]
})

export default router