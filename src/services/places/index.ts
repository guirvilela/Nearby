import { Alert } from "react-native";
import { api } from "../api";
import { PlacesResponse } from "./types";

export async function getPlaces(category: string) {
  try {
    const response = await api.get<PlacesResponse[]>(
      `/markets/category/${category}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert("Categorias", "Não foi possível carregar os lugares");
  }
}
