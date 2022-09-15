export type RegisterDataState = {
    name: string,
    numberPhone: string,
    email: string,
    password: string,
}
export type RegisterState = {
    errorMessage: string,
    successRegister: boolean,
    loading: boolean
}