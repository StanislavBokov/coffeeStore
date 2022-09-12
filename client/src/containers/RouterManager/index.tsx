import { FC, lazy } from 'react';
import { routes } from '../../appConstants';
import { H1 } from '../../components';
import { Routes, Route, Navigate } from 'react-router-dom';
import {  Basket, AboutCoffeeItem, PanelAdmin, Orders } from '../../pages';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Login } from '../../pages';

const Home = lazy(() => import('../../pages/Home').then((module) => ({ default: module.Home })));

export const RouteManager: FC = () => {
  
  // localStorageService.removeAuthData();
  // localStorageService.removeAdminData();
  
  const { isLoggedIn, auth } = useSelector((state:RootStateOrAny) => state.user);
  
  return (
    <Routes> 
      {/* <Route path="*" element={<NotFound />} /> */}

      <Route path="/login" element={ isLoggedIn ? <Navigate to="/" /> : <Login />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/:id" element={<AboutCoffeeItem />} />
      <Route path="/panelAdmin" element={auth?.isAdmin === true ? <PanelAdmin /> : <H1 align="center">Нет доступа</H1>} />
      <Route path="/panelAdmin/orders" element={auth?.isAdmin === true ? <Orders /> : <H1 align="center">Нет доступа</H1>} />

      <Route 
        path={routes.home.root} 
        element={ isLoggedIn ? <Home /> : <Navigate to="/login" /> }
      />
    </Routes>
  );
};
