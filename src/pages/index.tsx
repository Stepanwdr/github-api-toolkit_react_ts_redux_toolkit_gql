import { FC, lazy } from 'react';
import { Route, Routes } from 'react-router';
import { PrivateRoutes, PublicRoutes } from '../router';
import { useAppSelector } from '../hooks/redux';
import React from 'react';

const Authorization=lazy(() => import("./Authorization/Authorization"));
const Home=lazy(() => import("./Home/Home"));

const AppRouter: FC = () => {
  const { isAuth } = useAppSelector(state => state.authSlice)
   
  if (isAuth) {
    return (
      <React.Suspense>
      <Routes>
        {
          PrivateRoutes.map(({ path, Element }) =>
          (
            <Route
              key={path}
              path={path}
              element={(<Element />)}
            />
          )
          )
        }
        <Route path={"*"} element={<Home />} />
      </Routes>
      </React.Suspense>
    )
  }
  return (
    <React.Suspense>
    <Routes>
      {
        PublicRoutes.map(({ path, Element }) => (
          <Route
            key={path}
            path={path}
            element={(<Element />)}
          />
        ))
      }
      <Route path={"*"} element={<Authorization />} />
    </Routes>
    </React.Suspense>
  );
};

export default AppRouter;