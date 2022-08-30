import { createAction } from '@reduxjs/toolkit';
import actionsTypes from './actionsTypes';

export const fetchCoffeeAction = createAction(actionsTypes.FETCHING_COFFEE);