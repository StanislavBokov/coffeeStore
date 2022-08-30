import  { FC, useState } from "react";
import styles from './styles.module.scss';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { 
  Text,
  H3, 
  ProgressBar, 
  Slider, 
  MySelect, 
  PackVariable, 
  ChangeAmount,
  TodoOrder 
} from "..";

interface CoffeeItemProps {
  name: string,
  country: string,
  minPrice: number,
  maxPrice: number,
  forWhat: string,
  fermentation: string,
  description: string,
  acidity: number,
  density: number,
  maxValue: number,
  images: string[],
  id: string
}
export const CoffeeItem:FC<CoffeeItemProps> = ({
  id, 
  name, 
  images,
  minPrice,
  maxPrice,
  fermentation,
  description,
  acidity,
  density
}) => {
  const optionsArray = [
    { value: "зерно", label: "зерно" },
    { value: "молотый", label: "Молотый" }
  ];

  const { basket } = useTypedSelector((state) => state.basket);

  const [valueAmount, setValueAmount] = useState(1);
  const [valueSelect, setValueSelect] = useState('зерно');
  const [valueGrams, setValueGrams] = useState(250);
  
  return (
    <div className={styles.mainWrappper}>
      <div className={styles.border} />
      <div className={styles.wrapper}>
        <H3>{name}</H3>
        <Text>{fermentation}</Text>
        <Slider images={images} id={id} />
        <Text className={styles.description}>{description}</Text>
        <div className={styles.progressBars}>
          <ProgressBar currentValue={acidity} text="Кислотность"/>
          <ProgressBar currentValue={density} text="Плотность"/>
        </div>  
        <div className={styles.wrapperSelect}>
          <MySelect 
            options={optionsArray} 
            value={valueSelect}
            setValue={setValueSelect}
            className="coffeeItem-select"
          />
          <ChangeAmount 
            valueAmount={valueAmount}
            setValueAmount={setValueAmount}
          />
        </div>
        <div className={styles.wrapperPackAndBuy}>
          <PackVariable 
            minPrice={minPrice} 
            maxPrice={maxPrice}
            grams={valueGrams}
            setGrams={setValueGrams}
          />
          <TodoOrder 
            id={id}
            basket={basket} 
            // isModalBought={isModalBought}
            selectedValue={{ valueAmount, valueSelect, valueGrams }}
          />   
        </div> 
      </div>     
    </div>
  );
};