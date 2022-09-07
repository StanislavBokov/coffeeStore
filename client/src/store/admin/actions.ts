/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';
import { IAddLotAction } from '../../types';
import actionsTypes from './actionTypes';

export const removeLotAction = createAction<string>(actionsTypes.REMOVE_LOT);
export const upDateLotAction = createAction<any>(actionsTypes.UPDATE_LOT);
export const addLotAction = createAction<IAddLotAction>(actionsTypes.ADD_LOT);
export const uploadedFilesAction = createAction<any>(actionsTypes.UPLOADED_FILES);
export const setAvailabilityLotAction = createAction<string>(actionsTypes.SET_AVAILABILITY_LOT);
export const fetchAllOrdersAction = createAction(actionsTypes.FETCH_ALL_ORDERS);
export const deliveredOrderAction = createAction<{ id: string, userId: string }>(actionsTypes.DELIVERED_ORDER);
