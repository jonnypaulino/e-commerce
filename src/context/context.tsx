import { createContext } from "react";
import { AplicationTypes } from "../types/types";
import { StateAplication } from "./state";

export const AplicationContext = createContext<AplicationTypes | null>(null);

interface Props {
  children: React.ReactNode;
}

const AplicationProvider = ({ children }: Props) => {
  const {
    products,
    addProductCart,
    cart,
    deleteItemCart,
    clearCart,
    addAmount,
    filterList,
    filter,
    filterListName,
    ordenarList
  } = StateAplication();

  return (
    <AplicationContext.Provider
      value={{
        products,
        addProductCart,
        cart,
        deleteItemCart,
        clearCart,
        addAmount,
        filterList,
        filter,
        filterListName,
        ordenarList
      }}
    >
      {children}
    </AplicationContext.Provider>
  );
};

export default AplicationProvider;
