import React, { ReactNode } from 'react';
import cn from 'clsx';
import { HeadingType, TextAlign as Align, TextColor as Color, TextWeight as Weight } from '../../types';
import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
  align?: Align;
  color?: Color;
  className?: string;
  weight?: Weight;
  uppercase?: boolean;
};

const createHeading =
  (type: HeadingType) => ({ children, className = '', align = 'left', color = 'default', weight = 'medium', uppercase, ...rest }: Props) => {
    const hProps = {
      className: cn(styles[type], styles[color], styles[`${weight}Weight`], className, styles[align], {
        [styles.uppercase]: uppercase
      }),
      children,
      ...rest
    };
    return React.createElement(type, hProps, children);
  };

export const H1 = createHeading('h1');
export const H2 = createHeading('h2');
export const H3 = createHeading('h3');
