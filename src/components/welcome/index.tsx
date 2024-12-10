import { Image, Text, View } from "react-native";
import { styled } from "./styles";

export function Welcome() {
  return (
    <View>
      <Image source={require("@/assets/logo.png")} style={styled.logo} />
      <Text style={styled.title}>Boas vindas ao Nearby!</Text>

      <Text style={styled.subtitle}>
        Tenha cupons de vantagem para usar em {"\n"} seus estabelecimentos
        favoritos.
      </Text>
    </View>
  );
}
