import { getCategories } from "@/services/categories";
import { CategoriesResponse } from "@/services/categories/types";
import { getPlaces } from "@/services/places";
import { PlacesResponse } from "@/services/places/types";
import * as Location from "expo-location";
import React, { useCallback } from "react";
import { useForm } from "../form";

interface HomeForm {
  categories: CategoriesResponse[];
  selectedCategory: string;
  markets: PlacesResponse[];
  location: Location.LocationObject | null;
}

export function useHomeController() {
  const form = useForm<HomeForm>({
    categories: [],
    selectedCategory: "",
    markets: [],
    location: null,
  });

  const fetchCategories = useCallback(async () => {
    const data = await getCategories();

    if (data) {
      form.setAll({
        categories: data,
        selectedCategory: data[0]?.id || "",
      });

      if (data[0]?.id) {
        fetchMarkets();
      }
    }
  }, [form.value]);

  const fetchMarkets = useCallback(async () => {
    const data = await getPlaces(form.value.selectedCategory);

    if (!form.value.selectedCategory) return;

    if (data) {
      form.setAll({
        markets: data,
      });
    }
  }, [form.value]);

  const handleSelectCategory = useCallback(
    async (idCategory: string) => {
      form.set("selectedCategory")(idCategory);
    },
    [form.value]
  );

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
      fetchMarkets();
    }
  }, [form.value.selectedCategory]);

  return {
    form,
    handleSelectCategory,
  };
}
