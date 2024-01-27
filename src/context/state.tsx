import { useEffect, useState } from "react";
import {
  CartJson,
  CartProductsType,
  ProductsJson,
  ProductsType,
} from "../types/types";
import productsjson from "./../data/products.json";
import { RemoveCart, SaveCart, getCart } from "../service/localstorage";

export const StateAplication = () => {
  const [products, setProducts] = useState<ProductsJson | undefined>();
  const [cart, setCart] = useState<CartJson | undefined>({ itens: [] });

  const addProductCart = async (item: CartProductsType) => {
    const isItemInCart = cart?.itens?.some((props) => props.id === item.id);

  if (isItemInCart) {
    setCart((prevCart) => ({
      ...prevCart,
      itens: prevCart?.itens?.map((props) =>
        props.id === item.id ? { ...props, amount: item.amount! + 1 } : item
      ),
    }));
  } else {
    setCart((prevCart) => ({
      ...prevCart,
      itens: [...prevCart?.itens!, { ...item, amount: 1 }],
    }));
  }
    await SaveCart(cart);
  };

  const deleteItemCart =(index: number) => {

    const newcart= {...cart}
    newcart.itens?.splice(index, 1)
    setCart(newcart)
  }

  const clearCart = () => {
    setCart({itens: []})
    RemoveCart()
  }

  useEffect(() => {
    setProducts(productsjson);
  }, []);

  useEffect(() => {
    // Obtenha o objeto da localStorage

    if (getCart()) {
      const storedCartObject = JSON.parse(getCart()!);
      setCart(storedCartObject);
    }
  }, []);


  return { products, addProductCart, cart, deleteItemCart, clearCart};
};
