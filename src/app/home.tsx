import { Categories } from "@/components/categories";
import { Places } from "@/components/places";
import { useHomeController } from "@/hooks/home";
import { View } from "react-native";

export default function Home() {
  const { form, handleSelectCategory } = useHomeController();

  return (
    <View style={{ flex: 1, backgroundColor: "#c3c3c3" }}>
      <Categories
        data={form.value.categories}
        onSelectCategory={handleSelectCategory}
        selectedItem={form.value.selectedCategory}
      />

      <Places data={form.value.markets} />
    </View>
  );
}
