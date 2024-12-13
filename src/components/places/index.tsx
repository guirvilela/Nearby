import { PlacesResponse } from "@/services/places/types";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import { Place } from "../place";
import { Skeleton } from "../skeleton";
import { styled } from "./styles";

interface PlacesProps {
  data: PlacesResponse[];
  loading: boolean;
}

export function Places({ data, loading }: PlacesProps) {
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
        renderItem={({ item }) =>
          loading ? (
            <Skeleton />
          ) : (
            <Place
              data={item}
              onPress={() =>
                router.push({
                  pathname: "/market/[id]",
                  params: { id: item.id },
                })
              }
            />
          )
        }
        contentContainerStyle={styled.content}
        ListHeaderComponent={() => (
          <Text style={styled.title}>Explore locais perto de você</Text>
        )}
      />
    </BottomSheet>
  );
}
