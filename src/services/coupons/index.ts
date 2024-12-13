import { Alert } from "react-native";
import { api } from "../api";
import { CouponResponse } from "./types";

export async function getCoupon(id: string) {
  try {
    const response = await api.patch<CouponResponse>(`/coupons/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert("Copons", "Não foi possível carregar os cupons");
  }
}
