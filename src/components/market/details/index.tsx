import { MarketResponse } from "@/services/market/types";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { MarketInfo } from "../Info";
import { styled } from "./styles";

interface MarketDetailsProps {
  data: MarketResponse;
}

export function MarketDetails({ data }: MarketDetailsProps) {
  return (
    <View style={styled.container}>
      <Text style={styled.name}>{data.name}</Text>
      <Text style={styled.description}>{data.description}</Text>

      <View style={styled.group}>
        <Text style={styled.title}>Informações</Text>

        <MarketInfo
          description={`${data.coupons} cupons disponíveis`}
          icon={IconTicket}
        />

        <MarketInfo description={data.address} icon={IconMapPin} />

        <MarketInfo description={data.phone} icon={IconPhone} />
      </View>

      <View style={styled.group}>
        <Text style={styled.title}>Regulamento</Text>

        {data.rules.map((rule) => (
          <Text
            key={rule.id}
            style={styled.rule}
          >{`\u2022 ${rule.description}`}</Text>
        ))}
      </View>
    </View>
  );
}
