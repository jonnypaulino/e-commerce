import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { useContext } from "react";
import {
  Padding,
  Row,
  RowReponsive,
} from "../../../../assets/styles/globalstyles";
import { AplicationContext } from "../../../../context/context";
import { AplicationTypes, FilterValuesTypes } from "../../../../types/types";

const ModalFilter = ({
  visible,
  onHide,
}: {
  visible: boolean;
  onHide(): void;
}) => {
  const props = useContext(AplicationContext) as AplicationTypes;

  const initialValues: FilterValuesTypes = {
    minPrice: props.filter?.minPrice ?? undefined,
    maxPrice: props.filter?.maxPrice ?? undefined,
    dates: props.filter?.dates ?? [],
  };
  return (
    <Dialog
      header="Filtros"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
          props.filterList({
            maxDate: values.dates[1],
            maxPrice: values.maxPrice,
            minDate: values.dates[0],
            minPrice: values.minPrice,
          });
        }}
      >
        {({ values, handleChange, setFieldValue }) => {
          console.log(values);
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
                <Button label="Limpar Filtro" severity="danger" type="button" />
              </Row>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default ModalFilter;
