import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import { useContext } from "react";
import { AplicationContext } from "../../../../context/context";
import { AplicationTypes } from "../../../../types/types";

const FiltperChips = () => {
  const props = useContext(AplicationContext) as AplicationTypes;
  return (
    <div>
      {props.filter?.minPrice ? (
        <Chip label={"Min. Preço: R$" + props.filter?.minPrice} />
      ) : null}{" "}
      {props.filter?.maxPrice ? (
        <Chip label={"Max. Preço: R$" + props.filter?.maxPrice} />
      ) : null}{" "}
    </div>
  );
};

export default FiltperChips;
