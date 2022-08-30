import { FC } from 'react';
import styles from './styles.module.scss';
import { Button, Text } from '..';

interface ChangeAmout {
  valueAmount: number,
  setValueAmount: React.Dispatch<React.SetStateAction<number>>
}
export const ChangeAmount:FC<ChangeAmout> = ({ valueAmount, setValueAmount }) => {
  const increment = () => {
    setValueAmount(valueAmount + 1);
  };
  const dicrement = () => {
    if(valueAmount > 1) {
      setValueAmount(valueAmount - 1);
    }
  };
  return (
    <div className={styles.amount}>
      <Button variant="text" size="noSize" className={styles.btnsAmount} onClick={dicrement}>-</Button>
      <Text>{valueAmount}</Text>
      <Button variant="text" size="noSize" className={styles.btnsAmount} onClick={increment}>+</Button>
    </div>
  );
};