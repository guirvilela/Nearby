import { Button } from "@/components/button";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { ImageBackground, View } from "react-native";
import { styled } from "./styles";

interface MarketCoverProps {
  uri: string;
}

export function MarketCover({ uri }: MarketCoverProps) {
  return (
    <ImageBackground source={{ uri }} style={styled.container}>
      <View style={styled.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}
