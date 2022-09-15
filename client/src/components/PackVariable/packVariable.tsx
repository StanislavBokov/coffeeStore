import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'clsx';
import { Button, Text } from '..';

interface PackVariable {
    minPrice: number,
    maxPrice: number,
    grams: number,
    setGrams: React.Dispatch<React.SetStateAction<number>>
    // AboutCoffeeItemPage?: boolean,
    className?: string
}
export const PackVariable:FC<PackVariable> = ({ minPrice, maxPrice, grams, setGrams, className }) => {
  const packVariable = (grams:number) => {
    setGrams(grams);
  };
  
  return (
    <div className={cn(styles.packVariableWrapper, className)}>
      <Button variant="text" onClick={()=>packVariable(250)} size="noSize" >
        <Text align="center" color="secondrary"  className={cn({ [styles.selectedPrice]: grams === 250 })}>250 г</Text>
        <Text align="center" color="secondrary"  className={cn({ [styles.selectedPrice]: grams === 250 })}>{minPrice} &#8381;</Text>
      </Button>
      <Button variant="text" onClick={()=>packVariable(1000)} size="noSize">
        <Text align="center" color="secondrary" className={cn({ [styles.selectedPrice]: grams === 1000 })}>1000 г</Text>
        <Text align="center" color="secondrary"  className={cn({ [styles.selectedPrice]: grams === 1000 })}>{maxPrice} &#8381;</Text>
      </Button>
    </div> 
  );
};