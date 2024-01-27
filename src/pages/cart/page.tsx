import { Card } from "primereact/card";
import { Container, Padding, Row } from "../../assets/styles/globalstyles";
import { Button } from "primereact/button";
import CartList from "./components/cartList";
import { useContext } from "react";
import { AplicationContext } from "../../context/context";
import { AplicationTypes } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { RemoveCart } from "../../service/localstorage";

const Cart = () => {
  const props = useContext(AplicationContext) as AplicationTypes;
  const history = useNavigate()
  return (
    <Container>
      <i className="pi pi-arrow-left" style={{fontSize: "1.5rem", cursor: "pointer"}} onClick={() => history(-1)}/>
      <Padding padding="16px" />
      <Card>
        {props.cart?.itens?.map((item, index) => {
          return <CartList item={item} index={index}/>;
        })}
        {props.cart?.itens?.length === 0 ? <h1 style={{marginTop: "16px"}}>Sem Pordutos</h1> : null}
        <Padding padding="8px" />
        <Row justifyContent="end" style={{gap: "10px"}}>
          <Button label="Limpar carrinho" severity="danger" onClick={props.clearCart}/>
          <Button label="Finalizar compra" />
        </Row>
      </Card>
    </Container>
  );
};

export default Cart;
