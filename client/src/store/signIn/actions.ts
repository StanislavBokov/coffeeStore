import { createAction } from '@reduxjs/toolkit';
import actionsTypes from './actionsTypes';

export const signInAction = createAction<{ email: string, password: string }>(actionsTypes.SIGNI_IN);