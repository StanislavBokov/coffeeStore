import { FC } from 'react';
import { Text } from '../../components';
import styles from './styles.module.scss';

export const Footer:FC = () => {
 
  return (
    <div className={styles.Footer}>
      <div className={styles.firstPart} >
        <div className={styles.wrapper}>
          <Text>+7-xxx-xxx-xx-xx</Text>
          <Text>info@</Text>
        </div>
      
      </div>
      <div className={styles.secondPart}>
        <Text>Сделанно мной</Text>
      </div>
    </div>
  );
};