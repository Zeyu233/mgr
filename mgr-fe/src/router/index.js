import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Auth" */'../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import('../layout/BasicLayout/index.vue'),
    children:[
      {
        path: 'books',
        name: 'Books',
        component: () => import('../views/Books/index.vue'),
      },
      {
        path: 'books/:id',
        name: 'BookDetail',
        component: () => import('../views/BookDetail/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/Users/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
