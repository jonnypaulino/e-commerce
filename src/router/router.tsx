import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListProducts from "../pages/listProducts/page";
import Cart from "../pages/cart/page";


const RoutesApp = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ListProducts />} path="/"  />
                <Route element={<Cart />} path="/cart"/>
                <Route path="/*" element={<div>Pagina não encontrada</div>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;