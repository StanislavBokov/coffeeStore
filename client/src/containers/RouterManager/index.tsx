import { FC, lazy } from 'react';
import { routes } from '../../appConstants';
import { Routes, Route, Navigate } from 'react-router-dom';
import {  Basket, AboutCoffeeItem, PanelAdmin } from '../../pages';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Login } from '../../pages';

const Home = lazy(() => import('../../pages/Home').then((module) => ({ default: module.Home })));

export const RouteManager: FC = () => {
  
  // localStorageService.removeAuthData();
  // localStorageService.removeAdminData();
  
  const { isLoggedIn } = useSelector((state:RootStateOrAny) => state.user);
  
  return (
    <Routes> 
      {/* <Route path="*" element={<NotFound />} /> */}

      <Route path="/login" element={ isLoggedIn ? <Navigate to="/" /> : <Login />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/:id" element={<AboutCoffeeItem />} />
      <Route path="/panelAdmin" element={<PanelAdmin />} />
      <Route 
        path={routes.home.root} 
        element={ isLoggedIn ? <Home /> : <Navigate to="/login" /> }
      />
    </Routes>
  );
};
