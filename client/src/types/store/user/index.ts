
export type UserState = {
    isLoggedIn: boolean,
    auth: { userId: string | null, isAdmin: string | null} | null
}