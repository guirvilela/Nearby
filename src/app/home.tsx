import { Categories } from "@/components/categories";
import { Places } from "@/components/places";
import { useHomeController } from "@/hooks/home";
import { Text, View } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";

import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router";
import React from "react";

export default function Home() {
  const { form, handleSelectCategory } = useHomeController();

  const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
  };

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={form.value.categories}
        onSelectCategory={handleSelectCategory}
        selectedItem={form.value.selectedCategory}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Circle
          center={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          radius={2000}
          strokeColor="rgba(0, 150, 255, 0.7)"
          fillColor="rgba(0, 150, 255, 0.2)"
        />

        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {form.value.markets.map((marker, i) => (
          <Marker
            key={marker.id}
            identifier={`marker-map-${marker.id}-${i}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout
              onPress={() =>
                router.push({
                  pathname: "/market/[id]",
                  params: { id: marker.id },
                })
              }
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.gray[600],
                  fontFamily: fontFamily.medium,
                }}
              >
                {marker.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.gray[600],
                  fontFamily: fontFamily.regular,
                }}
              >
                {marker.address}
              </Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={form.value.markets} loading={form.value.loading} />
    </View>
  );
}
