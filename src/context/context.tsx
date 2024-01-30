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
    toast,
    filterListName,
    ordenarList,
    CleanFilter,
    FinishBuy
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
        toast,
        filterListName,
        ordenarList,
        CleanFilter, 
        FinishBuy
      }}
    >
      {children}
    </AplicationContext.Provider>
  );
};

export default AplicationProvider;
