import { getCategories } from "@/services/categories";
import { CategoriesResponse } from "@/services/categories/types";
import { getPlaces } from "@/services/places";
import { PlacesResponse } from "@/services/places/types";
import React, { useCallback } from "react";
import { useForm } from "../form";

interface HomeForm {
  categories: CategoriesResponse[];
  selectedCategory: string;
  markets: PlacesResponse[];
}

export function useHomeController() {
  const form = useForm<HomeForm>({
    categories: [],
    selectedCategory: "",
    markets: [],
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

  const fetchMarkets = useCallback(async () => {
    const data = await getPlaces(form.value.selectedCategory);

    if (data) {
      form.set("markets")(data);
    }
  }, [form.value]);

  const handleSelectCategory = useCallback(
    async (idCategory: string) => {
      form.set("selectedCategory")(idCategory);
    },
    [form.value]
  );

  React.useEffect(() => {
    fetchCategories();
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
