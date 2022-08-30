import { createAction } from '@reduxjs/toolkit';
import actionsTypes from './actionsTypes';
import { RegisterDataState } from '../../types';

export const registerUserAction = createAction<RegisterDataState>(actionsTypes.REGISTER_USER);