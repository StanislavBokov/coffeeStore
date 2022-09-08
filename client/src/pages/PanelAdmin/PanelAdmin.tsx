import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
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
      {/* <h1>Admin</h1> */}
      {/* <AddCoffeeItem /> */}
      <Orders />
    </div>
  
  );
};