import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { Column, Padding, Row } from "../../../../assets/styles/globalstyles";
import { AplicationTypes, CardProductsType } from "../../../../types/types";
import { Galleria } from "primereact/galleria";
import { colors } from "../../../../assets/styles/colors";
import { useContext } from "react";
import { AplicationContext } from "../../../../context/context";

const CardProducts = ({ item }: CardProductsType) => {

  const props = useContext(AplicationContext) as AplicationTypes
  const itemTemplate = (item: any) => {
    return (
      <img
        src={item}
        alt={item.alt}
        style={{ width: 256, height: 256, display: "block" }}
      />
    );
  };

  return (
    <Card style={{ height: "100%" }}>
      <Column justifyContent="space-between">
        <Row justifyContent="center">
          <Galleria
            value={item.imagem}
            style={{ maxWidth: "100%" }}
            showThumbnails={false}
            showIndicators
            item={itemTemplate}
          />
        </Row>
        <Padding />
        <Column>
          <h3>{item.name}</h3>
          <Padding />
          <p>
            {item.description.substring(0, 64)}
            {item.description.length > 64 ? "..." : null}
          </p>
          <Padding />
          <Padding />
          <Row justifyContent="space-between">
            <Column justifyContent="center">
              <h3 style={{ color: colors.primary }}>R$ {item.price}</h3>
            </Column>
            <Button label="Comprar" icon="pi pi-cart-plus" onClick={() => props.addProductCart(item)} />
          </Row>
        </Column>
      </Column>
    </Card>
  );
};

export default CardProducts;
