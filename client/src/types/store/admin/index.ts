import { ItemBasket } from "..";
import { orderState } from "..";
import { DataTextInput, DataRangeInput } from "../..";

export type ItemOrder = {
    email: string,
    address: string,
    valueDelivery: string,
    valuePayment: string,
    comment: string,
    lots: ItemBasket[],
    _id: string,
    userId: string
}
export interface AdminState {
    images: string[],
    uploaded: boolean,
    loading: boolean,
    successReqest: boolean,
    successRemove: boolean,
    allOrders: ItemOrder[]
}

export interface IAddLotAction extends DataTextInput, DataRangeInput {
    fermentation: string,
    degreeRoast:string,
    images: string[]
}