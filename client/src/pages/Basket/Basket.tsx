/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { H1, H2, H3, Text, Button, CoffeeInBasket, Input, MySelect } from '../../components';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { fetchCoffeeAction } from '../../store/coffee/actions';
import { fetchBasketAction } from '../../store/basket/actions';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Link } from 'react-router-dom';
import { optionsPayment, optionsDelivery } from './helper';
import { todoOrderAction } from '../../store/user/actions';
import { loader } from '../../assets/icons';
import { CSSTransition } from 'react-transition-group';

export const Basket:FC = () => {
  const dispatch = useDispatch();

  const [valueData, setValueData] = useState({
    address: '',
    comment: ''
  })

  const [valueDelivery, setValueDelivery] = useState("СДЭК");
  const [valuePayment, setValuePayment] = useState("Картой онлайн");

  const { auth, orders, loading, successRequest }  = useSelector((state:RootStateOrAny) => state.user); // fix it
  const { basket } = useTypedSelector((state) => state.basket);
  
  useEffect(() => {
    dispatch(fetchBasketAction(auth.userId));
    dispatch(fetchCoffeeAction())
  },[]);

  useEffect(() => {
    if(successRequest) {
      setValueData({
        address: '',
        comment: ''
      })
    }
  }, [successRequest])

  const totalSum = basket.reduce((acc: any, curr:any) => {
    return acc + (curr.price * curr.amount); 
  }, 0);

  const handleChange = ({ target }:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {    
    setValueData((prevState:any) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleTodoOrder = () => {
    console.log('ee');
    
    dispatch(todoOrderAction({ 
      id: auth.userId,
      address: valueData.address, 
      valueDelivery, 
      valuePayment, 
      comment: valueData.comment
    }))
  }

  return (
    <div className={styles.Basket}>
      <div className={styles.orderingWrapper}>
        <div>
          <H2 className={styles.mainTitle}>Оформление заказа</H2>
          <div>
            <Input value={valueData.address} onChange={handleChange} name="address" placeholder="Населенный пункт" id="1"/>
          </div>
          <div>
            <H3 className={styles.titlesOrder}>Способ доставки</H3>
            <MySelect options={optionsDelivery} value={valueDelivery} setValue={setValueDelivery} className="custom-select" />
          </div>
          <div >
            <H3 className={styles.titlesOrder}>Способ Оплаты</H3>
            <MySelect options={optionsPayment} value={valuePayment} setValue={setValuePayment} className="custom-select"  />
          </div>
          <div>
            <Input value={valueData.comment} onChange={handleChange} name="comment" placeholder="Комментарий к заказу" textArea className={styles.textArea} id="2"/>
          </div>
          <H3 className={styles.titlesOrder}>Итого к оплате: {totalSum}</H3>
          <div className={styles.btnOrderContainer}>
            <Button size="sm" onClick={handleTodoOrder} className={styles.orderBtn} disable={Boolean(!basket.length)}>{loading ? <img src={loader} className={styles.imgLoader}/> : 'Оформить'}</Button>
            <CSSTransition
              in={successRequest}
              timeout={300}
              unmountOnExit
              classNames="message"
            >
              <Text className={styles.textMessage} color="success">Заказ оформлен</Text>
            </CSSTransition>
          </div>
       
        </div>
      </div>
     
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