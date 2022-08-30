import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { fetchCoffeeAction } from '../../store/coffee/actions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { 
  Slider, 
  Text, 
  H1,
  H2, 
  ProgressBar, 
  MySelect, 
  Button, 
  PackVariable, 
  ChangeAmount,
  TodoOrder
} from '../../components';
import { Description } from './components';
import { useParams } from 'react-router';

export const AboutCoffeeItem:FC = () => {
  const { modal } = useTypedSelector((state) => state);
  const { coffee } = useTypedSelector((state) => state.coffee);
  const { isModalBought } = modal;

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
    <div className={styles.AboutCoffeeItem}>
      <div className={styles.wrapper}>
        <div>
          <Slider images={coffeeItem!.images} id={coffeeItem!._id} className={styles.slider} AboutCoffeeItemPage />
        </div>
        <div>
          <H1>{coffeeItem!.name}</H1>
          <Text className={styles.description}>{coffeeItem!.description}</Text>
          <div className={styles.progressBarWrapper}>
            <ProgressBar currentValue={coffeeItem!.acidity} text="Кислотность" className={styles.barItem} />
            <ProgressBar currentValue={coffeeItem!.density} text="Плотность" className={styles.barItem} />
          </div>
          <div className={styles.wrapperSelectAndAmount}>
            <MySelect 
              options={optionsArray} 
              value={valueSelect}
              setValue={setValueSelect}
            />
            <ChangeAmount 
              valueAmount={valueAmount}
              setValueAmount={setValueAmount}
            />
          </div>
          <div className={styles.wrapperPackAndBuy}>
            <PackVariable 
              minPrice={coffeeItem!.minPrice} 
              maxPrice={coffeeItem!.maxPrice}
              grams={valueGrams}
              setGrams={setValueGrams}
              className={styles.widthContainer}
              AboutCoffeeItemPage
            />
            {/* <TodoOrder 
              id={id}
              // orderArray={orderArray} 
              isModalBought={isModalBought}
              selectedValue={{ valueAmount, valueSelect, valueGrams }}
            /> */}
          </div>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.wrapperBtn}>
          <Button variant="text"><H2>Описание</H2></Button>
          {/* <Button variant="text"><H2>Комментарии</H2></Button> */}
        </div>
        <Description coffeeItem={coffeeItem!}/>
      </div>   
    </div>
  );
};