import { FC } from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';

interface ModalProps {
  position: 'fixed' | 'absolute',
  className?: string,
  handleClick?: () => void
}
export const Modal:FC<ModalProps> = ({ className, children, position, handleClick }) => {
  
  return (
    <div className={styles[position]} onClick={handleClick}>
      <div className={cn(className, styles[position])} onClick={(e) => e.stopPropagation()}>
        {children}   
      </div>
    </div>
  );
};