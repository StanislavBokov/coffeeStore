import { FC, useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { CSSTransition } from 'react-transition-group';
import { fetchBasketAction } from '../../../../store/basket/actions';
import { loader } from '../../../../assets/icons';
import { optionsDelivery, optionsPayment } from './helper';
import { fetchCoffeeAction } from '../../../../store/coffee/actions';
import { todoOrderAction } from '../../../../store/user/actions';
import { useDispatch } from 'react-redux';
import { ItemBasket, orderState } from '../../../../types';
import { H2, H3, MySelect, Button, Input, Text } from '../../../../components';

interface OrderingProps {
    basket:ItemBasket[],
    auth: any,
    orders: orderState[],
    loading: boolean,
    successRequest: boolean
}
export const Ordering:FC<OrderingProps> = ({ basket, auth, orders, loading, successRequest }) => {
  const dispatch = useDispatch();

  const [valueData, setValueData] = useState<any>({
    address: { value: '', isBlur: false },
    comment: { value: '', isBlur: false }
  })
  const [valueDelivery, setValueDelivery] = useState("СДЭК");
  const [valuePayment, setValuePayment] = useState("Картой онлайн");

  useEffect(() => {
    dispatch(fetchBasketAction(auth.userId));
    dispatch(fetchCoffeeAction())
  },[]);

  useEffect(() => {
    if(successRequest) {
      setValueData({
        address: { value: '', isBlur: false },
        comment: { value: '', isBlur: false }
      })
    }
  }, [successRequest])
  
  const totalSum = basket.reduce((acc: any, curr:any) => {
    return acc + (curr.price * curr.amount); 
  }, 0);

  const handleChange = ({ target }:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {    
    setValueData((prevState:any) => ({
      ...prevState,
      [target.name]: { ...valueData[target.name], value: target.value  }
    }));
  };

  const handleBlur = ({ target }:any) => {        
    setValueData((prevState:any) => ({
      ...prevState,
      [target.name]: { ...valueData[target.name], isBlur: true  }
    }));
  };

  const handleTodoOrder = () => {
  
    dispatch(todoOrderAction({ 
      id: auth.userId,
      address: valueData.address.value, 
      valueDelivery, 
      valuePayment, 
      comment: valueData.comment.value
    }))
  }
  return (
    <div className={styles.orderingWrapper}>
      <div>
        <H2 className={styles.mainTitle}>Оформление заказа</H2>
        <div>
          <Input 
            value={valueData.address.value} 
            onChange={handleChange} 
            name="address" 
            placeholder="Населенный пункт *" 
            id="1"
            error={!valueData.address.value}
            onBlur={handleBlur}
            blur={valueData.address.isBlur}
          />
          {valueData.address.isBlur && !valueData.address.value && <Text color="error">Field is required</Text>}
          
        </div>
        <div>
          <H3 className={styles.titlesOrder}>Способ доставки</H3>
          <MySelect 
            options={optionsDelivery} 
            value={valueDelivery} 
            setValue={setValueDelivery} 
            className="custom-select"
          />
        </div>
        <div >
          <H3 className={styles.titlesOrder}>Способ Оплаты</H3>
          <MySelect 
            options={optionsPayment} 
            value={valuePayment} 
            setValue={setValuePayment} 
            className="custom-select" 
          />
        </div>
        <div>
          <Input 
            value={valueData.comment.value} 
            onChange={handleChange}
            name="comment" 
            placeholder="Комментарий к заказу" 
            textArea 
            className={styles.textArea} 
            id="2"
          />
        </div>
        <H3 className={styles.titlesOrder}>Итого к оплате: {totalSum}</H3>
        <div className={styles.btnOrderContainer}>
          <Button 
            size="sm"
            onClick={handleTodoOrder}
            className={styles.orderBtn} 
            disable={Boolean(!basket.length) || Boolean(!valueData.address.value)}
          >
            {loading ? <img src={loader} className={styles.imgLoader}/> : 'Оформить'}
          </Button>
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
  )
}