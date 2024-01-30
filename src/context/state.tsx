import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RemoveCart, SaveCart, getCart } from "../service/localstorage";
import {
  CartJson,
  CartProductsType,
  ProductsJson
} from "../types/types";
import productsjson from "./../data/products.json";

export const StateAplication = () => {
  const [products, setProducts] = useState<ProductsJson | undefined>();

  const [cart, setCart] = useState<CartJson | undefined>({ itens: [] });
  const toast = useRef<Toast>(null);

  const show = () => {
    toast.current!.show({
      severity: "info",
      summary: "Info",
      detail: "Item adicionado ao carrinho",
    });
  };

  const showBuy = () => {
    toast.current!.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Compra feita com sucesso",
    });
  };
  const history = useNavigate();
  const FinishBuy = () => {
    setCart({ itens: [] });
    RemoveCart();
    showBuy();
    setTimeout(() => {
      history("/");
    }, 1600);
  };

  const CleanFilter = () => {
    history("/");
    window.location.reload()
  };

  const location = useLocation();

  const addProductCart = (item: CartProductsType) => {
    const isItemInCart = cart?.itens?.some((props) => props.id === item.id);
    const newCart = { ...cart };

    if (isItemInCart) {
      for (const props of newCart.itens!) {
        if (props.id === item.id) {
          props.amount = props.amount! + 1;
        }
      }
    } else {
      newCart.itens?.push({ ...item, amount: 1 });
    }
    setCart(newCart);
    SaveCart(newCart);
    show();
  };

  const addAmount = (id: number, amount: number) => {
    const newCart = { ...cart };

    for (const props of newCart.itens!) {
      if (props.id === id) {
        props.amount = amount;
      }
    }
    setCart(newCart);
    SaveCart(newCart);
  };

  const deleteItemCart = (index: number) => {
    const newcart = { ...cart };
    newcart.itens?.splice(index, 1);
    setCart(newcart);
  };

  const clearCart = () => {
    setCart({ itens: [] });
    RemoveCart();
  };

  const filterList = (searchParams: URLSearchParams) => {
    const name = searchParams.get("filtername");

    const queryMinPrice = searchParams.get("minPrice");
    const queryMaxPrice = searchParams.get("maxPrice");
    const queryMinDate = searchParams.get("minDate");
    const queryMaxDate = searchParams.get("maxDate");

    const minPrice = queryMinPrice ?? 0;
    const maxPrice = queryMaxPrice ?? 9999;

    const maxData = queryMaxDate
      ? new Date(queryMaxDate).getTime()
      : Date.now();
    const minData = queryMinDate
      ? new Date(queryMinDate).getTime()
      : new Date("1990-01-01").getTime();

    var newProducts = { ...productsjson };

    if (name !== "" && name) {
      const filter = newProducts.items?.filter((props) =>
        props?.name.toLowerCase().includes(name!)
      );
      newProducts = { ...newProducts, items: filter || [] };
      setProducts({ ...newProducts, items: filter || [] });
    }

    const filter = newProducts.items?.filter((item) => {
      const itemDate = new Date(item.date).getTime();
      return (
        item.price >= parseInt(minPrice.toString()) &&
        item.price <= parseInt(maxPrice.toString()) &&
        itemDate >= minData &&
        itemDate <= maxData
      );
    });

    setProducts({ ...newProducts, items: filter || [] });
  };

  const filterListName = (name: string) => {
    const newProducts = { ...productsjson };
    var filter;
    if (name !== "") {
      filter = newProducts.items?.filter((props) =>
        props?.name.toLowerCase().includes(name)
      );
      setProducts({ ...newProducts, items: filter || [] });
    } else {
      setProducts({ ...newProducts, items: newProducts.items! });
    }
  };

  const ordenarList = (value: number) => {
    const newProducts = { ...products };

    if (value === 1) {
      setProducts({
        ...newProducts,
        items: newProducts.items?.sort((a, b) => a.price - b.price)!,
      });
    }
    if (value === 2) {
      setProducts({
        ...newProducts,
        items: newProducts.items?.sort((a, b) => b.price - a.price)!,
      });
    }
    if (value === 3) {
      setProducts({
        ...newProducts,
        items: newProducts.items?.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )!,
      });
    }
    if (value === 4) {
      setProducts({
        ...newProducts,
        items: newProducts.items?.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )!,
      });
    }
  };

  useEffect(() => {
    setProducts(productsjson);
    const searchParams = new URLSearchParams(location.search);
    if (searchParams) {
      filterList(searchParams);
    }
  }, []);

  useEffect(() => {
    if (getCart()) {
      const storedCartObject = JSON.parse(getCart()!);
      setCart(storedCartObject);
    }
  }, []);

  return {
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
    FinishBuy,
    CleanFilter,
  };
};
