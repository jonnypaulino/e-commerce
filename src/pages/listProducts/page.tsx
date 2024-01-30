import { useContext, useState } from "react";
import { AplicationContext } from "../../context/context";
import { AplicationTypes } from "../../types/types";
import { Card } from "primereact/card";
import {
  ButtonFloating,
  Container,
  Padding,
  Row,
  RowReponsive,
} from "../../assets/styles/globalstyles";
import CardProducts from "./components/CardProducts";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import ModalFilter from "./components/Modal";
import { Dropdown } from "primereact/dropdown";
import FiltperChips from "./components/FilterChips";
import { Form, Formik } from "formik";
import { Toast } from 'primereact/toast';


const ListProducts = () => {
  const history = useNavigate();
  const location = useLocation();
  const [visible, setvisible] = useState(false);
  const props = useContext(AplicationContext) as AplicationTypes;
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("filtername") || "";
  const [ordena, setordena] = useState({});
  return (
    <Container>
      <Card>
        <RowReponsive justifyContent="space-between" style={{ gap: "8px" }}>
          <h2>Produtos eletrônicos e acessórios</h2>
          <Row style={{ gap: "20px" }}>
            <Formik
              initialValues={{ filterName: searchQuery }}
              onSubmit={(values) => {
                values.filterName
                  ? history(`/?filtername=${values.filterName}`)
                  : history("/");
                window.location.reload();
              }}
            >
              {({ values, handleChange }) => {
                return (
                  <Form>
                    <div className="p-inputgroup flex-1">
                      <InputText
                        placeholder="Search"
                        name="filterName"
                        value={values.filterName}
                        onChange={handleChange}
                      />
                      <Button icon="pi pi-search" />
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <Button
              rounded
              outlined
              icon="pi pi-filter"
              onClick={() => setvisible(!visible)}
            />
          </Row>
        </RowReponsive>
        <Padding padding="8px" />
        <Dropdown
          optionLabel="name"
          value={ordena}
          onChange={(e) => {
            setordena(e.target.value);
            props.ordenarList(e.target.value.id, props.products!);
          }}
          placeholder="Ordenar"
          options={[
            { id: 1, name: "Menor preço" },
            { id: 2, name: "Maior Preço" },
            { id: 3, name: "Mais Recentes" },
            { id: 4, name: "Mais antigas" },
          ]}
        />
        <Padding padding="8px" />
        <FiltperChips />
        <Padding padding="16px" />
        <div className="grid -mt-3 -ml-3 -mr-3">
          {props.products?.items.map((item, index) => {
            return (
              <div className="col-12 md:col-6 lg:col-4">
                <CardProducts item={item} />
              </div>
            );
          })}
          {props.products?.items?.length === 0 ? (
            <h2 style={{ margin: "auto" }}>Sem Produtos</h2>
          ) : null}
        </div>
      </Card>
      <ButtonFloating>
        <Button
          icon="pi pi-cart-plus"
          onClick={() => history("/cart")}
          label={props.cart?.itens?.length.toString()}
          iconPos="right"
        />
      </ButtonFloating>
      <ModalFilter visible={visible} onHide={() => setvisible(!visible)} />
      <Toast ref={props.toast} />
    </Container>
  );
};

export default ListProducts;
