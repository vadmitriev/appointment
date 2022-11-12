import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader, ErrorBoundary } from '@/components';

import { MainLayout, MinimalLayout } from '@/layouts';
import { PUBLIC_ROUTES } from './constants';
import { publicRoutes } from './PublicRoutes';

const NotFound = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

const Router = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<MainLayout />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          <Route element={<MinimalLayout />}>
            <Route
              path={PUBLIC_ROUTES.NOT_FOUND}
              element={<NotFound text="Page not found" />}
            />
            <Route
              path={PUBLIC_ROUTES.ERROR}
              element={<NotFound text="Some error occured" />}
            />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Router;
