import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Column,
  Container,
  Padding,
  Row,
} from "../../assets/styles/globalstyles";
import { AplicationContext } from "../../context/context";
import { AplicationTypes } from "../../types/types";
import CartList from "./components/cartList";
import { InputMask } from "primereact/inputmask";
import useCepFrete from "../../service/request/controller";

const Cart = () => {
  const props = useContext(AplicationContext) as AplicationTypes;
  const history = useNavigate();
  const [cep, setcep] = useState("");

  const cepFetch = useCepFrete(cep.replace(/\D/g, ""));
  const totalprice = props.cart?.itens!.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount! * currentItem.price;
  }, 0);

  console.log(cepFetch);
  return (
    <Container>
      <i
        className="pi pi-arrow-left"
        style={{ fontSize: "1.5rem", cursor: "pointer" }}
        onClick={() => history(-1)}
      />
      <Padding padding="16px" />
      <Card>
        {props.cart?.itens?.map((item, index) => {
          return <CartList item={item} index={index} />;
        })}
        {props.cart?.itens?.length === 0 ? (
          <h1 style={{ marginTop: "16px" }}>Sem Pordutos</h1>
        ) : null}
        <Padding padding="8px" />
        <label htmlFor="ssn" className="font-bold block mb-2">
          CEP
        </label>
        <div className="p-inputgroup w-3">
          <InputMask
            id="ssn"
            value={cep}
            onChange={(e) => setcep(e.target.value!)}
            mask="99999-999"
            placeholder="Digite seu CEP"
          ></InputMask>
          <Button icon="pi pi-search" />
        </div>
        <span style={{color: "red"}}>{cep !== "" && !cepFetch ? "CEP não encontrado" : null}</span>
        <div className="flex-auto"></div>
        <Padding padding="8px" />
        <Column>
          <p>Produtos: R${totalprice?.toFixed(2)}</p>
          <p>Frete: R${cepFetch ? cepFetch : 0}</p>
          <Padding />
          <div style={{ height: 1, background: "gray" }}></div>
          <Padding />
          <h3>
            Total: R$
            {cepFetch
              ? (totalprice! + cepFetch)?.toFixed(2)
              : totalprice?.toFixed(2)}
          </h3>
        </Column>
        <Padding />
        <Row justifyContent="end" style={{ gap: "10px" }}>
          <Row style={{ gap: "10px" }}>
            <Button
              label="Limpar carrinho"
              severity="danger"
              onClick={props.clearCart}
            />
            <Button label="Finalizar compra" />
          </Row>
        </Row>
      </Card>
    </Container>
  );
};

export default Cart;
