import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { Step } from "../step";
import { styled } from "./styles";

export function Steps() {
  return (
    <View style={styled.container}>
      <Text style={styled.title}>Veja como funciona:</Text>

      <Step
        icon={IconMapPin}
        title="Crie uma conta"
        description="Crie uma conta ou faça login para ter acesso à funcionalidades do Nearby"
      />

      <Step
        icon={IconQrcode}
        title="Ative o cupom com QR Code"
        description="Escaneie o código no estabelecimento para usar o benefício"
      />
      <Step
        icon={IconTicket}
        title="Garanta vantagens perto de você"
        description="Ative cupons onde estiver, em diferentes tipos de estabelecimento"
      />
    </View>
  );
}
