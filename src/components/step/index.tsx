import { colors } from "@/styles/colors";
import { IconProps } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";
import { styled } from "./styles";

interface StepProps {
  icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
}
export function Step({ title, description, icon: Icon }: StepProps) {
  return (
    <View style={styled.container}>
      {Icon && <Icon color={colors.red.base} />}
      <View style={styled.details}>
        <Text style={styled.title}>{title}</Text>
        <Text style={styled.description}>{description}</Text>
      </View>
    </View>
  );
}
