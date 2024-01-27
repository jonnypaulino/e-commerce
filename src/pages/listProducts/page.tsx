import { useContext } from "react";
import { AplicationContext } from "../../context/context";
import { AplicationTypes } from "../../types/types";
import { Card } from "primereact/card";
import { ButtonFloating, Container, Padding } from "../../assets/styles/globalstyles";
import CardProducts from "./components/CardProducts";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const ListProducts = () => {
    const history = useNavigate()
  const props = useContext(AplicationContext) as AplicationTypes;
  return (
    <Container>
      <Card>
        <h2>Produtos eletronicos e acessorios</h2>
        <Padding padding="8px" />
        <div className="grid -mt-3 -ml-3 -mr-3">
          {props.products?.items.map((item, index) => {
            return (
              <div className="col-12 md:col-6 lg:col-4">
                <CardProducts item={item} />
              </div>
            );
          })}
        </div>
      </Card>
      <ButtonFloating>
        <Button icon="pi pi-cart-plus" onClick={() => history("/cart")} label={props.cart?.itens?.length.toString()} iconPos="right"/>
      </ButtonFloating>
    </Container>
  );
};

export default ListProducts;
