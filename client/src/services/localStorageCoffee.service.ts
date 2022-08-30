/* eslint-disable @typescript-eslint/no-explicit-any */
const COFFEE_KEY = "coffee-key";

export function setCoffee(data:any) {
  localStorage.setItem(COFFEE_KEY, JSON.stringify(data));
}

export function getCoffee() {
  return JSON.parse(localStorage.getItem(COFFEE_KEY) || "{}");
}

const localStorageCoffeeService = {
  setCoffee,
  getCoffee
};
export default localStorageCoffeeService;
