import { useEffect, useState } from 'react';
import { getCep } from './request';

const useCepFrete = (cep: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
    try {
        const cepData = await getCep(cep);
        setData(cepData);

    }catch(e){
        
    }
    };

    fetchData();
  }, [cep]);

  const priceCEP = [
    { id: "AC", price: 50 },
    { id: "AL", price: 40 },
    { id: "AP", price: 45 },
    { id: "AM", price: 55 },
    { id: "BA", price: 35 },
    { id: "CE", price: 40 },
    { id: "DF", price: 30 },
    { id: "ES", price: 30 },
    { id: "GO", price: 30 },
    { id: "MA", price: 45 },
    { id: "MT", price: 35 },
    { id: "MS", price: 35 },
    { id: "MG", price: 25 },
    { id: "PA", price: 50 },
    { id: "PB", price: 40 },
    { id: "PR", price: 25 },
    { id: "PE", price: 40 },
    { id: "PI", price: 45 },
    { id: "RJ", price: 20 },
    { id: "RN", price: 40 },
    { id: "RS", price: 25 },
    { id: "RO", price: 50 },
    { id: "RR", price: 55 },
    { id: "SC", price: 30 },
    { id: "SP", price: 20 },
    { id: "SE", price: 35 },
    { id: "TO", price: 45 },
];

const price = priceCEP?.find(props => props.id === data?.data?.uf)

  return price?.price || undefined;
};

export default useCepFrete;
