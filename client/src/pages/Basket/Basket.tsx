/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useMemo } from 'react';
import { H2, Button, CoffeeInBasket } from '../../components';
import styles from './styles.module.scss';
import { Ordering } from './components/Ordering/Ordering';

import { useSelector, RootStateOrAny } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Link } from 'react-router-dom';

export const Basket:FC = () => {

  const { auth, orders, loading, successRequest }  = useSelector((state:RootStateOrAny) => state.user); // fix it
  const { basket } = useTypedSelector((state) => state.basket);
  
  return (
    <div className={styles.Basket}>
      <Ordering 
        basket={basket}
        auth={auth}
        orders={orders}
        loading={loading}
        successRequest={successRequest}
      />
      <div className={styles.wrapper}>
        {basket.length ? <div className={styles.selectedItemWrapper}>
          <div className={styles.info}>
            <H2 className={styles.titleBasket}>Корзина</H2>
          </div>
          {basket.map((item) => (
            <CoffeeInBasket 
              userId={auth.userId}
              _id={item._id}
              key={item._id}
              idProduct={item.id}
              grams={item.grams}
              amount={item.amount}
              isBeans={item.isBeans}
            />
          ))}
        </div> :
          <div>
            <H2>Ваша корзина пуста</H2>
            <Button size="sm" className={styles.btn}>
              <Link to="/">Перейти в каталог</Link>
            </Button>
          </div>
        }
      </div>
    </div>
  );
};