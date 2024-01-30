import { Route, Routes } from "react-router-dom";
import Cart from "../pages/cart/page";
import ListProducts from "../pages/listProducts/page";

const RoutesApp = () => {
  return (
    <Routes>
      <Route element={<ListProducts />} path="/" />

      <Route element={<Cart />} path="/cart" />
      <Route path="/*" element={<div>Pagina não encontrada</div>} />
    </Routes>
  );
};

export default RoutesApp;
