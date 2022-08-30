import { FC, useEffect, useCallback } from 'react';
import { Layout, RouteManager as Router } from './containers';
import { useDispatch } from 'react-redux';
import { fetchCoffeeAction } from './store/coffee/actions';

const App:FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoffeeAction());
  });

  return (
    <Layout>
      <Router />
    </Layout>
  );
};

export default App;
