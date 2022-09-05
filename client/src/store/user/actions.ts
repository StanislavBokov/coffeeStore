import { createAction } from '@reduxjs/toolkit';
import { orderState } from '../../types';
import actionsTypes from './actionsTypes';

export const todoOrderAction = createAction<Partial<orderState>>(actionsTypes.TODO_ORDER);