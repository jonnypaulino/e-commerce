import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputMask } from "primereact/inputmask";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Column,
  Container,
  Padding,
  Row,
  LengthInputCep,
} from "../../assets/styles/globalstyles";
import { AplicationContext } from "../../context/context";
import { AplicationTypes } from "../../types/types";
import Cep from "./components/cep";
import CartList from "./components/cartList";
import { Toast } from "primereact/toast";
import CardProducts from "../listProducts/components/CardProducts";

const Cart = () => {
  const props = useContext(AplicationContext) as AplicationTypes;
  const history = useNavigate();
  const [cep, setcep] = useState("");
  const [cepvalue, setCepValue] = useState(0);
  const totalprice = props.cart?.itens!.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount! * currentItem.price;
  }, 0);

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
          <h1 style={{ marginTop: "16px" }}>Sem Produtos</h1>
        ) : (
          <>
            <Padding padding="8px" />
            <label htmlFor="ssn" className="font-bold block mb-2">
              CEP
            </label>
            <LengthInputCep className={"p-inputgroup"}>
              <InputMask
                value={cep}
                onChange={(e) => setcep(e.target.value!)}
                mask="99999-999"
                placeholder="Digite seu CEP"
              ></InputMask>
              <Button icon="pi pi-search" />
            </LengthInputCep>
            {cep.replace(/\D/g, "").length > 7 ? (
              <Cep cep={cep} setValue={setCepValue} />
            ) : null}
            <div className="flex-auto"></div>
            <Padding padding="8px" />
            <Column>
              <p>Produtos: R${totalprice?.toFixed(2)}</p>
              <p>Frete: R${cepvalue}</p>
              <Padding />
              <div style={{ height: 1, background: "gray" }}></div>
              <Padding />
              <h3>
                Total: R$
                {cepvalue
                  ? (totalprice! + cepvalue)?.toFixed(2)
                  : totalprice?.toFixed(2)}
              </h3>
            </Column>
            <Padding />
            <Row justifyContent="end" style={{ gap: "8px" }}>
              <Row style={{ gap: "8px" }}>
                <Button
                  label="Limpar carrinho"
                  severity="danger"
                  onClick={props.clearCart}
                />
                <Button label="Finalizar compra" onClick={props.FinishBuy} />
              </Row>
            </Row>
          </>
        )}
      </Card>
      <Toast ref={props.toast} />
      <Padding padding="16px" />
      <div className="grid -mt-3 -ml-3 -mr-3">
        {props.products?.items?.slice(0, 3).map((item, index) => {
          return (
            <div className="col-12 md:col-6 lg:col-4">
              <CardProducts item={item} />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Cart;
