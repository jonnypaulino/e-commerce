import { ProductsJson } from "../types/types";

export const ordenarList = (value: number, products: ProductsJson) => {
  const newProducts = { ...products };

  if (value === 1) {
    return {
      ...newProducts,
      items: newProducts.items?.sort((a, b) => a.price - b.price)!,
    };
  }
  
  return newProducts;
};


export function formatarData(data: Date) {
    const dia = String(data.getDate()+ 1).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}