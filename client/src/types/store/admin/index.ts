import { DataTextInput, DataRangeInput } from "../..";

export interface AdminState {
    images: string[],
    uploaded: boolean,
    loading: boolean,
    successReqest: boolean
}

export interface IAddLotAction extends DataTextInput, DataRangeInput {
    fermentation: string,
    degreeRoast:string,
    images: string[]
}