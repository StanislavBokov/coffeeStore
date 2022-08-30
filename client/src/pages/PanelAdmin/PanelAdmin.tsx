import { FC } from 'react';
import styles from './styles.module.scss';
import { Orders, AddCoffeeItem, Coffee } from '.';
export const PanelAdmin:FC = () => {
  
  return (
    <div className={styles.PanelAdmin}>
      {/* <h1>Admin</h1> */}
      <AddCoffeeItem />
    </div>
  
  );
};