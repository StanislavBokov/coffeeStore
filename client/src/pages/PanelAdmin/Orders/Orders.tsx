import { FC, useState } from 'react';
import { Text, H3, Button } from '../../../components';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { deliveredOrderAction } from '../../../store/admin/actions';
import styles from './styles.module.scss';

export const Orders:FC = () => {
  const dispatch = useDispatch()
  const { allOrders } = useTypedSelector((state) => state.admin)
  const { coffee } = useTypedSelector((state) => state.coffee)
  const [selectId, setSelectId] = useState('')

  const handleShowLOts = (_id:string) => {
    if(selectId === _id) {
      setSelectId('')
    } else {
      setSelectId(_id)
    }   
  }
  const handleDeliveredOrder = (id: string, userId: string) => {
    dispatch(deliveredOrderAction({ id, userId }))
  }
  return (
    <div className={styles.ordersContainer}>
      {allOrders.map(({ address, valuePayment, valueDelivery, comment, lots, email, _id, userId }) => (
        <div>
          <div className={styles.orderData}>
            <Text>{address}</Text>
            <Text>{`Способ доставки: ${valueDelivery}`}</Text>
            <Text>{`Способ оплаты: ${valuePayment}`}</Text>
            <Text>{`E-mail отправителя: ${email}`}</Text>
          </div>
          <Button variant="text" size="noSize" className={styles.showLotsBtn} onClick={() => handleShowLOts(_id)}>Лоты на отправку</Button><br/>
          <Button variant="text" size="noSize" className={styles.orderDelivered} onClick={() => handleDeliveredOrder(_id, userId)}>Заказ доставлен</Button>
          {(selectId === _id) && <div className={styles.lotOrder}>
              
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