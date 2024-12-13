import { getCategories } from "@/services/categories";
import { CategoriesResponse } from "@/services/categories/types";
import { getPlaces } from "@/services/places";
import { PlacesResponse } from "@/services/places/types";
import * as Location from "expo-location";
import { debounce } from "lodash";
import React, { useCallback } from "react";
import { useForm } from "../form";

interface HomeForm {
  categories: CategoriesResponse[];
  selectedCategory: string;
  markets: PlacesResponse[];
  location: Location.LocationObject | null;
  loading: boolean;
}

export function useHomeController() {
  const form = useForm<HomeForm>({
    categories: [],
    selectedCategory: "",
    markets: [],
    location: null,
    loading: false,
  });

  const fetchCategories = useCallback(async () => {
    const data = await getCategories();

    if (data) {
      form.setAll({
        categories: data,
        selectedCategory: data[0].id,
      });
    }
  }, [form.value]);

  const fetchMarkets = useCallback(
    async (selectedCategory: string) => {
      try {
        form.set("loading")(true);

        const data = await getPlaces(selectedCategory);

        if (data) {
          const currentLocation = {
            latitude: -23.561187293883442,
            longitude: -46.656451388116494,
          };

          const filteredMarkets = data.filter((market) => {
            const distance = calculateDistance(
              currentLocation.latitude,
              currentLocation.longitude,
              market.latitude,
              market.longitude
            );
            return distance <= 2;
          });

          form.set("markets")(filteredMarkets);
        }
      } catch (error) {
        console.error("Erro ao buscar mercados:", error);
      } finally {
        form.set("loading")(false);
      }
    },
    [form.value]
  );

  const debouncedFetchMarkets = useCallback(debounce(fetchMarkets, 300), [
    fetchMarkets,
    form.value,
  ]);

  const handleSelectCategory = useCallback(
    async (idCategory: string) => {
      form.set("selectedCategory")(idCategory);

      debouncedFetchMarkets(idCategory);
    },
    [form.value, debouncedFetchMarkets]
  );

  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Retorna a distância em km
  }

  // const getLocation = useCallback(async () => {
  //   let { granted } = await Location.requestForegroundPermissionsAsync();

  //   if (granted) {
  //     let location = await Location.getCurrentPositionAsync({});
  //     form.set("location")(location);
  //   }
  // }, [form.value]);

  React.useEffect(() => {
    fetchCategories();
    // getLocation();
  }, []);

  React.useEffect(() => {
    if (form.value.selectedCategory) {
      debouncedFetchMarkets(form.value.selectedCategory);
    }
  }, [form.value.selectedCategory]);

  return {
    form,
    handleSelectCategory,
  };
}
