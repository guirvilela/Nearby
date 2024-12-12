import { getCoupon } from "@/services/coupons";
import { getMarket } from "@/services/market";
import { MarketResponse } from "@/services/market/types";
import { useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Alert } from "react-native";
import { useForm } from "../form";

interface MarketFormData {
  marketData: MarketResponse | null;
  loading: boolean;
  coupon: string;
  modal: boolean;
  couponIsFetching: boolean;
}

export function useMarketController() {
  const form = useForm<MarketFormData>({
    marketData: null,
    loading: true,
    coupon: "",
    modal: false,
    couponIsFetching: false,
  });
  const params = useLocalSearchParams<{ id: string }>();

  const [_, requestPermission] = useCameraPermissions();
  const qrLockLog = useRef(false);

  const fetchMarket = useCallback(async () => {
    try {
      const data = await getMarket(params.id);

      if (data) {
        form.set("marketData")(data);
        console.log(data);
      }
    } catch (error) {
      console.log("error"),
        Alert.alert(
          "Error fetching market",
          "Não foi possível carregar os dados",
          [{ text: "OK", onPress: () => router.back() }]
        );
    } finally {
      form.set("loading")(false);
    }
  }, [form.value, params.id]);

  const handleOpenCamera = useCallback(async () => {
    const { granted } = await requestPermission();

    try {
      if (!granted) {
        return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera");
      }
    } catch (error) {
      Alert.alert("Câmera", "Não foi possível utilizar a câmera");
    } finally {
      form.set("modal")(true);
      qrLockLog.current = false;
    }
  }, [form.value]);

  const getCouponAction = useCallback(
    async (id: string) => {
      form.set("couponIsFetching")(true);

      try {
        const data = await getCoupon(id);

        if (data) {
          Alert.alert("Cupom", data.coupon);
          form.set("coupon")(data.coupon);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível utilizar o cupom");
      } finally {
        form.set("couponIsFetching")(false);
      }
    },
    [form.value]
  );

  const handleUseCoupon = useCallback(
    (id: string) => {
      form.set("modal")(false);

      Alert.alert(
        "Cupom",
        "Não é possível utilizar o cupom já resgatado. Deseja realmente resgatar o cupom?",
        [
          { style: "cancel", text: "Não" },
          { text: "Sim", onPress: () => getCouponAction(id) },
        ]
      );
    },
    [form.value]
  );

  React.useEffect(() => {
    if (params.id) {
      fetchMarket();
    }
  }, [params.id]);

  return { form, qrLockLog, handleOpenCamera, handleUseCoupon };
}
