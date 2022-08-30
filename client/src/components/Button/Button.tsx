import { FC, ReactNode, useMemo, PropsWithChildren, createElement } from "react";
import cn from 'clsx';

import styles from './styles.module.scss';

export interface ButtonProps {
    variant?: 'filled' | 'outlined' | 'text';
    size?: 'lg' | 'md' | 'sm' | 'noSize';
    disable?: boolean;
    icon?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: () => void;
    className?: string;
    to?: string,
    href?: string;
}

export const Button:FC<PropsWithChildren<ButtonProps>> = ({ 
  variant = 'outlined',
  size = 'md', 
  disable = false, 
  icon, 
  children,
  className,
  to,
  href,
  onClick
}) => {
  const creationData = useMemo(() => {
    if (to) {
      return {
        tag: 'a',
        props: {
          to
        }
      };
    }

    if (href) {
      return {
        tag: 'a',
        props: {
          target: '_blank',
          rel: 'noopener noreferrer',
          href
        }
      };
    }
    return {
      tag: 'button',
      props: {
        onClick
      }
    };
  }, [to, href, onClick]);

  return createElement(
    creationData.tag,
    {
      ...creationData.props,
      className: cn(
        styles.button,
        styles[variant],
        styles[size],
        { [styles.disable]: disable },
        { [styles.icon]: icon },
        className
      ),
      disabled: disable,
      onClick: onClick
    },
    [children]
  );
};