import { FC, useEffect } from 'react';
import { fetchAllOrdersAction } from '../../../store/admin/actions';
import { Text, H3, Button } from '../../../components';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { showOrderLots } from '../../../store/admin/reducer';
import { deliveredOrderAction } from '../../../store/admin/actions';
import styles from './styles.module.scss';

export const Orders:FC = () => {
  const dispatch = useDispatch()

  const { allOrders } = useTypedSelector((state) => state.admin)
  const { coffee } = useTypedSelector((state) => state.coffee)

  const handleShowLOts = (_id: string) => {
    dispatch(showOrderLots(_id))  
  }
  const handleDeliveredOrder = (id: string, userId: string) => {
    dispatch(deliveredOrderAction({ id, userId }))
  }
  if(!allOrders.length) {
    return (
      <H3 align="center">Нет заказов</H3>
    )
  }
  return (
    <div className={styles.ordersContainer}>
      {allOrders.map(({ address, valuePayment, valueDelivery, comment, lots, email, _id, userId, isOpen }) => (
        <div>
          <div className={styles.orderData}>
            <Text>{address}</Text>
            <Text>{`Способ доставки: ${valueDelivery}`}</Text>
            <Text>{`Способ оплаты: ${valuePayment}`}</Text>
            <Text>{`E-mail отправителя: ${email}`}</Text>
            <Text>{`Комментарий: ${comment ? comment : 'Отсутствует'}`}</Text>
          </div>
          <Button variant="text" size="noSize" className={styles.showLotsBtn} onClick={() => handleShowLOts(_id)}>Лоты на отправку</Button><br/>
          <Button variant="text" size="noSize" className={styles.orderDelivered} onClick={() => handleDeliveredOrder(_id, userId)}>Заказ доставлен</Button>
          {isOpen && <div className={styles.lotOrder}>
              
            {lots.map(({ amount, isBeans, grams, id }) => {
              const lot = coffee.find((el) => el._id === id)
                
              return (
                <div className={styles.lotOrderItem}>
                  <Text>{`Наименование: ${lot!.name}`}</Text>  
                  <Text>{`Количество: ${amount}`}</Text>  
                  <Text>{`Форма: ${isBeans}`}</Text>  
                  <Text>{`Грамовка: ${grams}г`}</Text>  
                </div>
              )
            })}         
          </div>}
        </div>
      ))}

    </div>
  );
};