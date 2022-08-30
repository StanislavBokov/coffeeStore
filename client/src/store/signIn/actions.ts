import { createAction } from '@reduxjs/toolkit';
import actionsTypes from './actionsTypes';
import { RegisterDataState } from '../../types';

export const signInAction = createAction<RegisterDataState>(actionsTypes.SIGNI_IN);