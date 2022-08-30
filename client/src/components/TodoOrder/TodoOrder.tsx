import { FC, useState } from 'react';
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { buyCoffeeAction } from '../../store/basket/actions';
import { CoffeeItem, ItemBasket } from '../../types';
import { Button, ModalBoughtCoffee } from '..';

interface TodoOrderProps {
    id: any ,
    basket?: ItemBasket[],
    selectedValue: any
} 

export const TodoOrder:FC<TodoOrderProps> = ({ id, basket, selectedValue }) => {
  const dispatch = useDispatch();

  const [isModalBought, setModalBought] = useState(false);
  
  const { valueAmount, valueSelect, valueGrams } = selectedValue;
  
  const { userId } = useSelector((state:RootStateOrAny) => state.user.auth);

  const { coffee } = useSelector((state:RootStateOrAny) => state.coffee);
  const coffeeItem = coffee.find((el:CoffeeItem) => el._id === id);

  const price = valueGrams === 250 ? coffeeItem.minPrice : coffeeItem.maxPrice;

  const isBuyCoffee = () => {
    return basket?.find((item:ItemBasket) => {
      const _id = item.id === id;
      const grams = item.grams === valueGrams;
      const value = item.isBeans === valueSelect;
      return _id && grams && value;
    });
  };
      
  const todoOrder = (isBuy: ItemBasket | undefined) => {
    setModalBought(true);
    !isBuy && dispatch(buyCoffeeAction({ userId, product: { 
      id: id,
      isBeans: valueSelect,
      amount: valueAmount,
      grams: valueGrams,
      price: price  
    } }));
  };
  return (
    <>
      <Button size="sm" variant="filled" onClick={() => todoOrder(isBuyCoffee())}>{isBuyCoffee() ? 'В корзине' : 'Купить'}</Button>
      <CSSTransition in={isModalBought} timeout={200} classNames="modal" unmountOnExit>
        <ModalBoughtCoffee isBuyCoffee={isBuyCoffee()} setModalBought={setModalBought} />
      </CSSTransition>
    </>
  );
};
