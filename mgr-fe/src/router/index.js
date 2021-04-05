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
        component: () => import(/* webpackChunkName: "Auth" */'../views/Books/index.vue'),
      },
      {
        path: 'users',
        name: 'User',
        component: () => import(/* webpackChunkName: "Auth" */'../views/Books/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
