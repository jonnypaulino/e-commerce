import { Toast } from "primereact/toast";
import { RefObject } from "react";

export interface AplicationTypes {
  products?: ProductsJson;
  cart?: CartJson;
  addProductCart: (item: ProductsType) => void;
  deleteItemCart: (index: number) => void;
  clearCart: () => void;
  addAmount: (id: number, amount: number) => void;
  filterList: (searchParams: URLSearchParams) => void;
  ordenarList: (value: number, products: ProductsJson) => void;
  toast: RefObject<Toast>;
  FinishBuy: () => void;
  CleanFilter: () => void;
}

export interface CartJson {
  itens?: Array<CartProductsType>;
}

export interface ProductsJson {
  items: Array<ProductsType>;
}

export interface ProductsType {
  id?: number;
  name: string;
  price: number;
  date: Date | string;
  imagem: Array<string>;
  description: string;
  type: string;
}

export interface CartProductsType extends ProductsType {
  amount?: number;
}

export interface CardProductsType {
  item: ProductsType;
}

export interface CartShoppingProductsType {
  item: CartProductsType;
  index: number;
}

export interface FilterProductsType {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
}

export interface FilterValuesTypes {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  dates: Array<any>;
}
