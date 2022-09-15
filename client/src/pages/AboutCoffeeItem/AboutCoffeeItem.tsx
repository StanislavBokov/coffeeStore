import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { fetchCoffeeAction } from '../../store/coffee/actions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { Text, H2, MySelect, PackVariable, ChangeAmount,TodoOrder } from '../../components';
import { Description } from './components';
import { useParams } from 'react-router';

export const AboutCoffeeItem:FC = () => {
  const { basket } = useTypedSelector((state) => state.basket);
  const { coffee } = useTypedSelector((state) => state.coffee);

  const { id } = useParams();
  const coffeeItem = coffee.find((c) => c._id === id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoffeeAction());
  }, []);
  
  const optionsArray = [
    { value: "зерно", label: "зерно" },
    { value: "молотый", label: "Молотый" }
  ];
  const [valueAmount, setValueAmount] = useState(1);
  const [valueSelect, setValueSelect] = useState('зерно');
  const [valueGrams, setValueGrams] = useState(250);
  
  return (
    <>
      {coffee.length && 
       <div className={styles.AboutCoffeeItem}>
         <img src={coffeeItem!.images[0]} alt="" className={styles.img}/>
         <div>
           <H2 weight="light">{coffeeItem!.name}</H2>
           <Text className={styles.aboutCoffee}>{coffeeItem!.aboutCoffee}</Text>
           <Description coffeeItem={coffeeItem!}/>
           <div className={styles.divider}/>
           <div className={styles.containerOrder}>
             <div className={styles.column1}>
               <div className={styles.selectContainer}>
                 <MySelect 
                   options={optionsArray} 
                   value={valueSelect}
                   setValue={setValueSelect}
                   className="coffeeItem-select"
                 />
               </div>
               <PackVariable 
                 minPrice={coffeeItem!.minPrice} 
                 maxPrice={coffeeItem!.maxPrice}
                 grams={valueGrams}
                 setGrams={setValueGrams}
                 className={styles.widthContainer}
               />
             </div>
             <div className={styles.column2}>
               <TodoOrder 
                 id={id}
                 basket={basket} 
                 selectedValue={{ valueAmount, valueSelect, valueGrams }}
               />
               <div className={styles.changeAmountContainer}>
                 <ChangeAmount 
                   valueAmount={valueAmount}
                   setValueAmount={setValueAmount}
                 />
               </div>    
             </div>
           </div>
         </div>
       </div>}
     
    </>
  
  );
};