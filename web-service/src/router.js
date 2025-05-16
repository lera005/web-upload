import { createRouter, createWebHistory } from 'vue-router';
import MobileHome from './components/MBView.vue';
import DesktopHome from './components/PCView.vue';
import MainView from './views/MainView.vue'

function detectDevice() {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
}

const routes = [
  {
    path: '/',
    component: detectDevice() === 'mobile' ? MobileHome : DesktopHome
  },
  {
    path: '/main',
    component: MainView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
