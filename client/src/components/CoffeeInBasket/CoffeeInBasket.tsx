import { FC } from 'react';
import { Text, Button } from '..';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { removeCoffeeItemAction } from '../../store/basket/actions';
import styles from './styles.module.scss';

interface CoffeeInBasketProps {
  userId: string,
  _id:string,
  grams: number,
  amount: number,
  isBeans: string,
  idProduct: string
}
export const CoffeeInBasket:FC<CoffeeInBasketProps> = ({ userId, _id, idProduct, amount, isBeans, grams }) => {
  const dispatch = useDispatch();

  const { coffee } = useTypedSelector((state) => state.coffee);
  
  const coffeeItem = coffee.find((item) => item._id === idProduct);
  
  // const img = grams === 250 ? coffeeItem?.images[0] : coffeeItem?.images[1];
  const img = grams === 250 ? coffeeItem?.images[0] : coffeeItem?.images.length === 1 ? coffeeItem?.images[0] :  coffeeItem?.images[1];
  const finalPrice = grams === 250 ? coffeeItem?.minPrice! *amount : coffeeItem?.maxPrice!*amount;

  const deleteCoffee = () => {
    dispatch(removeCoffeeItemAction({ userId, _id }));
  };
  return (
    <div className={styles.CoffeeInBasket}>
      <div className={styles.imgContainer}>
        <img src={img} alt="image lot" className={styles.img} />
      </div>
     
      <div className={styles.gridContainer}>
        <div>
          <Text className={styles.infoText}>{coffeeItem?.name}</Text>
          <Text>{isBeans}</Text>
        </div>
        <div>
          <Text className={styles.infoText}>Количество</Text>
          <Text>{amount}</Text>
        </div>
        <div>
          <Text className={styles.infoText}>Цена</Text>
          <Text className={styles.finalPrice}>{finalPrice} &#8381;</Text>
        
        </div>
        <div>
          <Button variant="text" onClick={deleteCoffee} size="noSize">
          Удалить
          </Button>
        </div>
      </div>
  
    </div>
  ); 
};