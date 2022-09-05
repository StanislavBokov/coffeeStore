import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CoffeeContainer } from '../../containers';
import { fetchCoffeeAction } from '../../store/coffee/actions';
import { mainImg } from '../../assets/img/mainImg/index'
import { fetchBasketAction } from '../../store/basket/actions';

export const Home: FC = () => {
  const dispatch = useDispatch();
  const { coffee } = useTypedSelector((state) => state.coffee);
  const availableCoffee = coffee.filter((item) => item.available === true)
  const { userId }  = useSelector((state: RootStateOrAny) => state.user.auth); // fix it
  
  useEffect(() => {
    dispatch(fetchBasketAction(userId));
    if(!coffee.length) {
      dispatch(fetchCoffeeAction());
    }
  },[]);

  return (
    <div className={styles.Home}>
      {/* <div className={styles.info}>

      </div> */}
     
      <div className={styles.wrapper}>   
        {/* <img src={mainImg} alt="" className={styles.img}/> */}
        <CoffeeContainer coffeeArray={availableCoffee}/>
      </div>
    </div>
  );
};