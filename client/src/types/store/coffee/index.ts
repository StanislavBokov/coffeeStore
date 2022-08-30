/* eslint-disable @typescript-eslint/no-explicit-any */
export type CoffeeItem = {
    name: string,
    country: string,
    fermentation: string,
    images: string[],
    minPrice: number,
    maxPrice: number,
    acidity: number,
    density: number,
    screen: string,
    growthHeight: string,
    degreeRoast: string,
    aboutCoffee?: string,
    description: string,
    grade: number,
    _id: string
}
export type CoffeeState = {
    coffee: CoffeeItem[],
    selectedValue?:SelectedValue,
    loading: boolean,
    error: string
}

export type SelectedValue = {
    grams?: number,
    valueAmount?: number,
    valueSelect?: string
}

export type BuyState = {
    userId: string,
    product: { 
        id: string,
        isBeans?: string,
        amount?: number,
        grams?: number,
        price?: number
     }
}

export type userOrderState = [id:string, data:SelectedValue]
