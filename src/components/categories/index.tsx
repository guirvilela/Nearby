import { CategoriesResponse } from "@/services/categories/types";
import { FlatList } from "react-native";
import { Category } from "../category";
import { styled } from "./styles";

interface CategoriesProps {
  data: CategoriesResponse[];
  onSelectCategory: (id: string) => void;
  selectedItem: string;
}

export function Categories({
  data,
  selectedItem,
  onSelectCategory,
}: CategoriesProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelectCategory(item.id)}
          isSelected={item.id === selectedItem}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styled.content}
      style={styled.container}
    />
  );
}
