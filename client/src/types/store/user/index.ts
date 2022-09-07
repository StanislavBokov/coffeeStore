export type orderState = {
    id: string,
    address: string,
    valueDelivery: string,
    valuePayment: string,
    comment: string,
    lots: any,
    // user?: any
}

export type UserState = {
    isLoggedIn: boolean,
    auth: { userId: string | null, isAdmin: string | null} | null,
    orders: orderState[],
    loading: boolean,
    successRequest: boolean
}
