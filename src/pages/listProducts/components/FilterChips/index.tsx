import { Chip } from "primereact/chip";
import { useLocation } from "react-router-dom";
import { formatarData } from "../../../../controller/controller";

const FiltperChips = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);

  const queryMinPrice = searchParams.get("minPrice")
  const queryMaxPrice = searchParams.get("maxPrice")
  const queryMinDate = searchParams.get("minDate")
  const queryMaxDate = searchParams.get("maxDate")
 
  return (
    <div>
      {queryMinPrice ? (
        <Chip label={"Min. Preço: R$" + queryMinPrice} />
      ) : null}{" "}
      {queryMaxPrice ? (
        <Chip label={"Max. Preço: R$" + queryMaxPrice} />
      ) : null}{" "}
      {queryMinDate ? (
        <Chip label={"Min. Data: " + formatarData(new Date(queryMinDate))} />
      ) : null}{" "}
      {queryMaxDate ? (
        <Chip label={"Max. Data: " + formatarData(new Date(queryMaxDate))} />
      ) : null}{" "}
    </div>
  );
};

export default FiltperChips;
