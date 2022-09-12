import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { Button, Text } from '../../components';
import { Link } from 'react-router-dom';
import { Orders, AddCoffeeItem, Coffee, RemoveCoffeeItem } from '.';
import { fetchAllOrdersAction } from '../../store/admin/actions';
import { useDispatch } from 'react-redux';
export const PanelAdmin:FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllOrdersAction())
  }, [])

  return (

    <div className={styles.PanelAdmin}>

      <AddCoffeeItem />
      <div>
        <RemoveCoffeeItem />
        <Text size="lg" className={styles.textLink}>
          <Link to="orders" className={styles.linkOrder}>Перейти к заказам</Link>
        </Text>
      </div>
      
    </div>
  
  );
};