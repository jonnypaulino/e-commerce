import { Card } from "primereact/card";
import { Column, Padding, Row, RowReponsive } from "../../../../assets/styles/globalstyles";
import { Dropdown } from 'primereact/dropdown';
import { AplicationTypes, CartShoppingProductsType } from "../../../../types/types";
import { useContext } from "react";
import { AplicationContext } from "../../../../context/context";

const CartList = ({item, index}: CartShoppingProductsType) => {

    const props = useContext(AplicationContext) as AplicationTypes;
    return (
    <Card>
      <Row justifyContent="space-between">
        <RowReponsive>
          <img src={item?.imagem[0]} style={{width: 128}} alt="" />
          <Padding padding="16px" />
          <Column justifyContent="center" >
            <h3>{item?.name}</h3>
            <Padding />
            <Dropdown value={item?.amount} onChange={() => {}} options={[1,2,3,4]} 
                placeholder="Select a City" className="w-full md:w-4rem" />
          </Column>
        </RowReponsive>
        <Column justifyContent="center">
          <Row>
            <h3>R${item?.price*item?.amount!}</h3>
            <Padding padding="8px" />
            <i className="pi pi-trash" onClick={() => props.deleteItemCart(index)} />
          </Row>
        </Column>
      </Row>
    </Card>
  );
};

export default CartList;
