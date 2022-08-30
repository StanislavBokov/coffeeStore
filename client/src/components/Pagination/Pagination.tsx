import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'clsx';

interface PaginationProps {
    length: number,
    currentPage: number,
    changePage: (page:number) => void,
    pageSize: number
}
export const Pagination:FC<PaginationProps> = ({ length, currentPage, changePage, pageSize }) => {
  
  const amountPage = Math.ceil((length/pageSize));
  
  const createPageArr = (amount: number) => {
    let arr = [];
    for(let i = 1; i <= amount; i++) {
      arr.push(i);
    }
    return arr;
  };
  
  return (
    <div className={styles.Pagination}>
      {createPageArr(amountPage).map((page) => (
        <div key={page} className={cn(styles.item, { [styles.currentPage]: currentPage === page })} onClick={() => changePage(page)}>{page}</div>
      ))}
    </div>
  );
};