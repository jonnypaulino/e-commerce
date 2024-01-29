import { useQuery } from "react-query";
import http from "../axios/axios"

export const getCep = async (cep: string) => {
    return await http.get("/ws/"+ cep +"/json")
}

export const useFetchCep = (cep: string) => {
    return useQuery(["cepCatch", cep], () => getCep(cep));
};