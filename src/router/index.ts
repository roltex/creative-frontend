import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: 'about/mission',
        name: 'about-mission',
        component: () => import('../views/about/Mission.vue')
      },
      {
        path: 'about/reports',
        name: 'about-reports',
        component: () => import('../views/about/Reports.vue')
      },
      {
        path: 'competitions',
        name: 'competitions',
        component: () => import('../views/competitions/CompetitionsList.vue')
      },
      {
        path: 'competitions/current',
        name: 'competitions-current',
        component: () => import('../views/competitions/CurrentCompetitions.vue')
      },
      {
        path: 'competitions/archive',
        name: 'competitions-archive',
        component: () => import('../views/competitions/CompetitionsArchive.vue')
      },
      {
        path: 'competitions/success-stories',
        name: 'competitions-success-stories',
        component: () => import('../views/competitions/SuccessStories.vue')
      },
      {
        path: 'success-stories/:slug',
        name: 'success-story-details',
        component: () => import('../views/competitions/SuccessStoryDetails.vue')
      },
      {
        path: 'competitions/:slug',
        name: 'competition-details',
        component: () => import('../views/competitions/CompetitionDetails.vue')
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('../views/news/NewsList.vue')
      },
      {
        path: 'news/:slug',
        name: 'news-article',
        component: () => import('../views/news/NewsArticle.vue')
      },
      {
        path: 'press',
        name: 'press',
        component: () => import('../views/press/PressList.vue')
      },
      {
        path: 'press/:slug',
        name: 'press-article',
        component: () => import('../views/press/PressArticle.vue')
      },
      {
        path: 'events',
        name: 'events',
        component: () => import('../views/events/EventsCalendar.vue')
      },
      {
        path: 'events/:slug',
        name: 'event-details',
        component: () => import('../views/events/EventDetails.vue')
      },
      {
        path: 'resources',
        name: 'resources',
        component: () => import('../views/Resources.vue')
      },
      {
        path: 'resources/acts',
        name: 'resources-acts',
        component: () => import('../views/resources/Acts.vue')
      },
      {
        path: 'application',
        redirect: '/application/step-1'
      },
      {
        path: 'application/step-1',
        name: 'application-step-1',
        component: () => import('../views/ApplicationForm.vue')
      },
      {
        path: 'application/step-2',
        name: 'application-step-2',
        component: () => import('../views/ApplicationForm.vue')
      },
      {
        path: 'application/step-3',
        name: 'application-step-3',
        component: () => import('../views/ApplicationForm.vue')
      },
      {
        path: 'faqs',
        name: 'faqs',
        component: () => import('../views/FAQs.vue')
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('../views/Contact.vue')
      },
      {
        path: 'inspiration',
        name: 'inspiration',
        component: () => import('../views/Inspiration.vue')
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('../views/Search.vue')
      },
      {
        path: 'apply/competition',
        name: 'apply-competition',
        component: () => import('../views/applications/CompetitionApplication.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'apply/funding',
        name: 'apply-funding',
        component: () => import('../views/applications/FundingApplication.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/auth/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/auth/Register.vue')
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('../views/auth/ForgotPassword.vue')
      },
      {
        path: 'reset-password/:token',
        name: 'reset-password',
        component: () => import('../views/auth/ResetPassword.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/dashboard/Overview.vue')
      },
      {
        path: 'applications',
        name: 'dashboard-applications',
        component: () => import('../views/dashboard/Applications.vue')
      },
      {
        path: 'applications/:id',
        name: 'dashboard-application-details',
        component: () => import('../views/dashboard/ApplicationDetails.vue')
      },
      {
        path: 'profile',
        name: 'dashboard-profile',
        component: () => import('../views/dashboard/Profile.vue')
      },
      {
        path: 'settings',
        name: 'dashboard-settings',
        component: () => import('../views/dashboard/Settings.vue')
      },
      {
        path: 'notifications',
        name: 'dashboard-notifications',
        component: () => import('../views/dashboard/Notifications.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
