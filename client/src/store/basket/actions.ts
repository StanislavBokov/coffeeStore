import { createAction } from '@reduxjs/toolkit';
import actionsTypes from './actionsTypes';
import { Ids } from '../../types';
import { BuyState } from '../../types';

export const fetchBasketAction = createAction<string>(actionsTypes.FETCHING_BASKET);
export const removeCoffeeItemAction = createAction<Ids>(actionsTypes.REMOVE_COFFEEITEM);
export const buyCoffeeAction = createAction<BuyState>(actionsTypes.BUY_COFFEE);