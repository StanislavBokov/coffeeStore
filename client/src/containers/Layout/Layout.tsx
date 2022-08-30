import { UrlObject } from 'url';
import { Header, Footer } from '..';
import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

export interface LayoutProps {
  route?: UrlObject | string;
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {

  return (
    <div className={styles.main}>
      <Header />
      {children}
      <Footer /> 
    </div> 
  );
};
