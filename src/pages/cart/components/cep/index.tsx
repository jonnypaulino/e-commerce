import { useEffect } from "react";
import useCepFrete from "../../../../service/request/controller";

const Cep = ({ cep, setValue }: { cep: string, setValue: any }) => {
    const cepFetch = useCepFrete(cep);
    
    useEffect(() => {
        setValue(cepFetch ?? 0)
  }, [cepFetch, setValue])
  

  return <span>{!cepFetch && cep !== "" ? "cep não encontrado" : null}</span>;
};

export default Cep