import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'src/layouts/MainLayout.vue';
import OrganizationsPage from 'src/pages/OrganizationsPage.vue';
import DepartmentsPage from 'src/pages/DepartmentsPage.vue';
import PositionsPage from 'src/pages/PositionsPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: OrganizationsPage }, // Главная страница — Организации
      { path: 'departments', component: DepartmentsPage }, // Страница отделов
      { path: 'positions', component: PositionsPage }, // Страница должностей
      { path: 'home', component: () => import('pages/IndexPage.vue') }, // Альтернативная страница для IndexPage
    ],
  },

  // Всегда оставляйте это как последний маршрут для обработки ошибок 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'),
  },
];

export default routes;
