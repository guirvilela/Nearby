import { Alert } from "react-native";
import { api } from "../api";
import { CategoriesResponse } from "./types";

export async function getCategories() {
  try {
    const response = await api.get<CategoriesResponse[]>("/categories");

    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert("Categorias", "Não foi possível carregar as categorias");
  }
}
