import { CartJson } from "../types/types";

const keyCart = "JSON-CART";


export const SaveCart = (item: CartJson | undefined | string) => {
    const objectString = JSON.stringify(item);
    localStorage.setItem(keyCart, objectString);
}

export const getCart = () => {
    return localStorage.getItem(keyCart) ?? undefined
}

export const RemoveCart = () => {
    localStorage.removeItem(keyCart)
}