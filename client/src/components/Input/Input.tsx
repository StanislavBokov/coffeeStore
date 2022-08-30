/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { VFC, ChangeEvent, useState } from 'react';
import { openEye, closedEye } from '../../assets/icons';
import cn from 'clsx';
import { Text } from '..';

import { CSSTransition } from 'react-transition-group';
import styles from './styles.module.scss';

interface InputProops {
    type?: 'text' | 'password',
    value?: string,
    name: string,
    placeholder?: string;
    error?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (event: any) => void;
    textArea?: boolean,
    className?: string,
    id?: string 
}

export const Input:VFC<InputProops> = ({ 
  type,
  value, 
  name,
  placeholder,
  error,
  onChange,
  onBlur,
  textArea = false,
  className,
  id
}) => {

  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const toggleHandler = () => {
    setIsOpenPassword(!isOpenPassword);
  };
  return (
    <div className={cn(styles.wrapperInput, className)}>
      <label htmlFor={id}>
        <span className={cn(styles.span,  { [styles.isValue]: value }, { [styles.error]:error }, { [styles.isTextArea]:textArea } )}>{placeholder}</span>
        {textArea ?
          <textarea name={name} id={id} cols={20} rows={5} className={styles.textArea} onChange={onChange} value={value} /> :    
          <input 
            type={isOpenPassword ? "text" : type} 
            value={value} name={name} onChange={onChange} 
            className={cn(styles.Input, { [styles.error]:error })} onBlur={onBlur} 
            autoComplete="off"
            id={id}
          />}
        {type === "password" &&  <img src={isOpenPassword ? closedEye : openEye} alt="" className={styles.imgEye} onClick={toggleHandler} />}
        <CSSTransition
          classNames="inputMessage"
          in={Boolean(error)}
          timeout={300}
          
        >
          <Text className={styles.errorMessage}>{error}</Text>
        </CSSTransition>
      </label>
     
    </div>
  );
};