import { PlacesResponse } from "@/services/places/types";
import { colors } from "@/styles/colors";
import { IconTicket } from "@tabler/icons-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { styled } from "./styles";

export interface PlaceProps extends TouchableOpacityProps {
  data: PlacesResponse;
}

export function Place({ data, ...rest }: PlaceProps) {
  return (
    <TouchableOpacity style={styled.container} {...rest}>
      <Image style={styled.image} source={{ uri: data.cover }} />

      <View style={styled.content}>
        <Text style={styled.name}>{data.name}</Text>
        <Text style={styled.description} numberOfLines={2}>
          {data.description}
        </Text>

        <View style={styled.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={styled.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
