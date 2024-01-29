import { useEffect, useState } from "react";
import { RemoveCart, SaveCart, getCart } from "../service/localstorage";
import {
  CartJson,
  CartProductsType,
  FilterProductsType,
  FilterValuesTypes,
  ProductsJson,
} from "../types/types";
import productsjson from "./../data/products.json";
import { useLocation } from "react-router-dom";

export const StateAplication = () => {
  const [products, setProducts] = useState<ProductsJson | undefined>();
  const [productsDefault, setProductsDefault] = useState<
    ProductsJson | undefined
  >();
  const [cart, setCart] = useState<CartJson | undefined>({ itens: [] });
  const [filter, setFilter] = useState<FilterValuesTypes | undefined>();

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

  const filterList = (values: FilterProductsType) => {
    setProducts(productsjson);

    setFilter({
      dates: values.maxDate ? [values.minDate, values.maxDate] : [],
      maxPrice: values.maxPrice,
      minPrice: values.minPrice,
    });

    const minPrice = values.minPrice || 0;
    const maxPrice = values.maxPrice || 9999;

    const maxData = values.maxDate
      ? new Date(values.maxDate).getTime()
      : Date.now();
    const minData = values.minDate
      ? new Date(values.minDate).getTime()
      : new Date("1990-01-01").getTime();

    const newProducts = { ...productsDefault };

    const filter = newProducts.items?.filter((item) => {
      const itemDate = new Date(item.date).getTime();
      return (
        item.price >= minPrice &&
        item.price <= maxPrice &&
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
    const newProducts = { ...productsDefault };

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
    setProductsDefault(productsjson);
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("filterName");
    if (searchQuery) {
      filterListName(searchQuery);
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
    filter,
    filterListName,
    ordenarList,
  };
};
