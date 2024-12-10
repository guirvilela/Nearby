import { PlacesResponse } from "@/services/places/types";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import { Place } from "../place";
import { styled } from "./styles";

interface PlacesProps {
  data: PlacesResponse[];
}

export function Places({ data }: PlacesProps) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styled.indicator}
      backgroundStyle={styled.container}
      enableOverDrag={false}
      enableDynamicSizing={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} />}
        contentContainerStyle={styled.content}
        ListHeaderComponent={() => (
          <Text style={styled.title}>Explore locais perto de você</Text>
        )}
      />
    </BottomSheet>
  );
}