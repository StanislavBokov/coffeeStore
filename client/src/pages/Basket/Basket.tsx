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
import { ItemBasket } from '../../types';
import useInput from '../../hooks/useInput';

export const Basket:FC = () => {
  const dispatch = useDispatch();

  const address = useInput('');
  const comment = useInput('');
  const { userId }  = useSelector((state:RootStateOrAny) => state.user.auth); // fix it
  
  useEffect(() => {
    dispatch(fetchBasketAction(userId));
    dispatch(fetchCoffeeAction())
  },[]);

  const { basket } = useTypedSelector((state) => state.basket);

  const totalSum = basket.reduce((acc: any, curr:any) => {
    return acc + (curr.price * curr.amount); 
  }, 0);
  
  const optionsDelivery = [
    { value: "СДЭК", label: "СДЭК" },
    { value: "OZON", label: "OZON" }
  ];

  const optionsPayment = [
    { value: "Картой онлайн", label: "Картой онлайн" },
    { value: "При доставке", label: "При доставке" }
  ];
  const [valueDelivery, setValueDelivery] = useState("СДЭК");
  const [valuePayment, setValuePayment] = useState("Картой онлайн");

  const mock = { roast: '13 июня 13:00 МСК', send: '14 июня' };
  return (
    <div className={styles.Basket}>
      <div className={styles.orderingWrapper}>
        <div>
          <H2 className={styles.mainTitle}>Оформление заказа</H2>
          <div>
            <Input {...address} name="adress" placeholder="Населенный пункт" id="1"/>
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
            <Input {...comment} name="adress" placeholder="Комментарий к заказу" textArea className={styles.textArea} id="2"/>
          </div>
          <H3 className={styles.titlesOrder}>Итого к оплате: {totalSum}</H3>
          <Button size="sm">Оформить</Button>
        </div>
      </div>
     
      <div className={styles.wrapper}>
        {basket.length ? <div className={styles.selectedItemWrapper}>
          <div className={styles.info}>
            <H2 className={styles.titleBasket}>Корзина</H2>
            {/* <div className={styles.date}> */}
            {/* <div className={styles.textWrapper}>
                <Text>Передаем на обжарку: </Text>
                <Text size="lg">{mock.roast}</Text>
              </div>
              <div className={styles.textWrapper}>
                <Text>Отправка:</Text>
                <Text size="lg">{mock.send}</Text>
              </div> */}
            {/* </div> */}
          </div>
          {basket.map((item: ItemBasket) => (
            <CoffeeInBasket 
              userId={userId}
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