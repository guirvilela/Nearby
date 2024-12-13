import React from "react";
import { View } from "react-native";
import { styled } from "./styles";

export function Skeleton() {
  return (
    <View style={styled.skeletonContainer}>
      <View style={styled.skeletonImage} />
      <View style={styled.skeletonTextContainer}>
        <View style={styled.skeletonText} />
        <View style={{ gap: 8 }}>
          <View style={styled.skeletonTextSmall} />
          <View style={[styled.skeletonTextSmall, { marginTop: 10 }]} />
        </View>
      </View>
    </View>
  );
}
