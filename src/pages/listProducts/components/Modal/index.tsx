import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Padding,
  Row,
  RowReponsive,
} from "../../../../assets/styles/globalstyles";
import { AplicationTypes, FilterValuesTypes } from "../../../../types/types";
import { useContext } from "react";
import { AplicationContext } from "../../../../context/context";

const ModalFilter = ({
  visible,
  onHide,
}: {
  visible: boolean;
  onHide(): void;
}) => {
  const history = useNavigate();
  const location = useLocation();
  const props = useContext(AplicationContext) as AplicationTypes
  const searchParams = new URLSearchParams(location.search);

  const initialValues: FilterValuesTypes = {
    minPrice: searchParams.get("minPrice")
      ? parseInt(searchParams.get("minPrice")!)
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? parseInt(searchParams.get("maxPrice")!)
      : undefined,
    dates: searchParams.get("maxDate")!
      ? [
          new Date(searchParams.get("minDate")!),
          new Date(searchParams.get("maxDate")!),
        ]
      : [],
  };
  return (
    <Dialog
      header="Filtros"
      visible={visible}
      style={{  width: window.screen.width < 800 ? "90%" : "50vw" }}
      onHide={onHide}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const queryParams: any = {};

          if (values.minPrice !== undefined && values.minPrice !== null) {
            queryParams.minPrice = values.minPrice.toString();
          }
          if (values.maxPrice !== undefined && values.maxPrice !== null) {
            queryParams.maxPrice = values.maxPrice.toString();
          }

          if (values.dates[0] !== undefined && values.dates[0] !== null) {
            queryParams.minDate = values.dates[0].toString();
          }
          if (values.dates[1] !== undefined && values.dates[1] !== null) {
            queryParams.maxDate = values.dates[1].toString();
          }

          const filtername = searchParams.get("filtername");
          if (filtername) {
            queryParams.filtername = filtername;
          }

          const url = {
            pathname: "/",
            search: new URLSearchParams(queryParams).toString(),
          };

          history(url);
          onHide();
          window.location.reload();
        }}
      >
        {({ values, handleChange, setFieldValue }) => {
          return (
            <Form>
              <RowReponsive
                justifyContent="space-between"
                style={{ gap: "10px" }}
              >
                <div>
                  <label htmlFor="integeronly" className="font-bold block mb-2">
                    Preço minino
                  </label>
                  <InputNumber
                    value={values.minPrice}
                    placeholder="Preço minimo"
                    name="minPrice"
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    onChange={(e) => setFieldValue("minPrice", e.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="withoutgrouping"
                    className="font-bold block mb-2"
                  >
                    Preço maximo
                  </label>
                  <InputNumber
                    name="maxPrice"
                    value={values.maxPrice}
                    mode="currency"
                    placeholder="Preço máximo"
                    currency="BRL"
                    locale="pt-BR"
                    onChange={(e) => setFieldValue("maxPrice", e.value)}
                  />
                </div>{" "}
              </RowReponsive>
              <Padding padding="8px" />
              <div className="flex-auto">
                <label htmlFor="integeronly" className="font-bold block mb-2">
                  Datas
                </label>
                <Calendar
                  value={values.dates}
                  onChange={handleChange}
                  name="dates"
                  selectionMode="range"
                  readOnlyInput
                  placeholder="Datas"
                />
              </div>
              <Padding padding="16px" />
              <Row justifyContent="end" style={{ gap: "8px" }}>
                <Button label="Aplicar Filtro" />
                <Button label="Limpar Filtro" severity="danger" type="button" onClick={props.CleanFilter} />
              </Row>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default ModalFilter;
