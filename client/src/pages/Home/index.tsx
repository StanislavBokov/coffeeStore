import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CoffeeContainer } from '../../containers';
import { fetchCoffeeAction } from '../../store/coffee/actions';
import { fetchBasketAction } from '../../store/basket/actions';

export const Home: FC = () => {
  const dispatch = useDispatch();
  const { coffee } = useTypedSelector((state) => state.coffee);
  const { userId }  = useSelector((state: RootStateOrAny) => state.user.auth); // fix it
  
  useEffect(() => {
    dispatch(fetchBasketAction(userId));
    if(!coffee.length) {
      dispatch(fetchCoffeeAction());
    }
  },[]);

  return (
    <div className={styles.Home}>
      <div className={styles.wrapper}>   
        <CoffeeContainer coffeeArray={coffee}/>
      </div>
    </div>
  );
};