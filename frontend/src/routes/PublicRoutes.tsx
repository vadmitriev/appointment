import { lazy } from 'react';
import { IRoute } from '@/interfaces/route.interface';
import { PUBLIC_ROUTES } from './constants';

export const publicRoutes: IRoute[] = [
  {
    path: PUBLIC_ROUTES.HOME,
    name: 'Home',
    component: lazy(() => import('@/pages/HomePage/HomePage')),
  },
  {
    path: PUBLIC_ROUTES.HISTORY,
    name: 'History',
    component: lazy(() => import('@/pages/HistoryPage/HistoryPage')),
  },
];
