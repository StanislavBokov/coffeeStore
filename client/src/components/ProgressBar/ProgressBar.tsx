import { VFC } from 'react';
import { Text } from '..';
import styles from './styles.module.scss';
import cn from 'clsx';

export interface ProgressBarProps {
    text?: string;
    currentValue: number;
    className?: string
  }

export const ProgressBar: VFC<ProgressBarProps> = ({ text, currentValue, className }) => {
  const currentWidth = (currentValue * 100) / 10;
  return (
    <div>
      <div className={cn(styles.bars, className)}>
        <div className={styles.fillBars} style={{ width: `${currentWidth}%` }} />
      </div>
      <Text>{text}</Text>
    </div>

  );
};