import { Alert } from "react-native";
import { api } from "../api";
import { MarketResponse } from "./types";

export async function getMarket(id: string) {
  try {
    const response = await api.get<MarketResponse>(`/markets/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert(
      "Estabelecimento",
      "Não foi possível carregar o estabelecimento"
    );
  }
}
