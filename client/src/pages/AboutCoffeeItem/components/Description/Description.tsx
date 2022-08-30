/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import styles from './styles.module.scss';
import { Text, H3 } from '../../../../components';
import { CoffeeItem } from '../../../../types';
import { fair, seed } from '../../../../assets/icons';

interface Description {
    coffeeItem: CoffeeItem
}
export const Description:FC<Description> = ({ coffeeItem }) => {
  
  return (
    <div>
      <div className={styles.info}>
        <div className={styles.roasing}>
          <img src={fair} alt="" className={styles.fairImg}/>
          <Text>Ростер для обжарки:</Text>
          <Text weight="medium">Loring S70 Peregrine</Text>
          <Text>{`Степень обжарки:`}</Text>
        </div>
        <div className={styles.seedInfoext}>
          <img src={seed} alt="" className={styles.seedImg}/>
          <Text>Регион: Серадо</Text>
          <Text>{`Способ обработки: ${coffeeItem.fermentation}`}</Text>
          <Text>{`Размер зерен: ${coffeeItem.screen}`}</Text>
          <Text>{`Высоты произрастания: ${coffeeItem.growthHeight}`}</Text>
        </div>
        <div className={styles.greed}>
          <Text align="center">Оценка Q-грейдера:</Text>
          <H3>{coffeeItem.grade}</H3>
        </div>
      </div>
      <div>
        <Text>{coffeeItem.aboutCoffee}</Text>
      </div>
    </div>
  );
};
