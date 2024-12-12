import { colors } from "@/styles/theme";
import { IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { styled } from "./styles";

interface MarketCouponProps {
  code: string;
}

export function MarketCoupon({ code }: MarketCouponProps) {
  return (
    <View style={styled.container}>
      <Text style={styled.title}>Utilize esse cupom</Text>

      <View style={styled.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={styled.code}>#{code}</Text>
      </View>
    </View>
  );
}
