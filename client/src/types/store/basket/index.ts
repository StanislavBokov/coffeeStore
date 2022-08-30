/* eslint-disable @typescript-eslint/no-explicit-any */
export type ItemBasket = {
    id: string, 
    _id: string,
    isBeans: string,
    amount: number,
    grams: number,
    price: number
}
export type BasketState = {
    basket: ItemBasket[]
    loading: boolean,
    error: string
}
export type Ids = {
    userId: string,
    _id: string
}
