import { colors } from "@/styles/theme";
import { IconProps } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { styled } from "./styles";

interface MarketInfoProps {
  description: string;
  icon: React.ComponentType<IconProps>;
}

export function MarketInfo({ description, icon: Icon }: MarketInfoProps) {
  return (
    <View style={styled.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={styled.text}>{description}</Text>
    </View>
  );
}
