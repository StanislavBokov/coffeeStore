/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from "react";
import styles from './styles.module.scss';
import { IOptions } from "../../types";
import { SortBy } from "../../pages/Home";
import Select from 'react-select';

interface MySelectProps {
  options: IOptions[],
  value: string | string[],
  setValue:any
  onInputChange?: any,
  isMulti?: boolean,
  placeholder?: string,
  className?: string
}

export const MySelect:FC<MySelectProps> = ({ 
  options, 
  value, 
  setValue, 
  onInputChange, 
  isMulti = false,
  placeholder,
  className
}) => {

  const handleChangeSelect = (newValue: any) => {
    setValue( isMulti? newValue.map((v: any) => v.value) : newValue.value);
  };
  const getValue = () => {
  
    if(value) {
      return isMulti
        ? options.filter((option) => value.indexOf(option.value) >=0 ) 
        : options.find((option:IOptions) => option.value === value);
    } else {
      return isMulti ? [] : '';
    }
  };

  return (
    <Select 
      options={options} 
      className={styles.select}
      onChange={handleChangeSelect} 
      value={getValue()} 
      onInputChange={onInputChange} 
      isMulti={isMulti}
      placeholder={placeholder}
      classNamePrefix={className}
    />
  );
};