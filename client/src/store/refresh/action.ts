
import { createAction } from '@reduxjs/toolkit';
import actionsTypes from './actionTypes';

export const refreshAction = createAction(actionsTypes.REFRESH);