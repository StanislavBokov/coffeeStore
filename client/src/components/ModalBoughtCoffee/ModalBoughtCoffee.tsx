/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import styles from './styles.module.scss';
import { Modal, H3, Button } from '..';
import { useDispatch } from 'react-redux';
import { checkMark } from '../../assets/icons';
import { Link } from 'react-router-dom';

interface ModalBoughtCoffee {
  isBuyCoffee: any;
  setModalBought:any;
}
export const ModalBoughtCoffee:FC<ModalBoughtCoffee> = ({ isBuyCoffee, setModalBought }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    setModalBought(false);
    // dispatch(setModalBought(false));
  };
  
  return (
    <Modal position="fixed" className={styles.Modal} handleClick={handleClick}>
      <img src={checkMark} alt="" className={styles.checkMark} />
      <H3 align="center">{isBuyCoffee ? 'Товар уже был добавлен в корзину' : 'Товар добавлен в корзину'}</H3>
      {/* <H3 align="center">Товар добавлен в корзину</H3> */}
      <Link to="/basket" className={styles.addInBasketBtn} onClick={handleClick}>
        <Button size="sm">В корзину</Button>
      </Link>
      <Button variant="text" onClick={handleClick}>Продолжить покупки</Button>
    </Modal>
  );
};