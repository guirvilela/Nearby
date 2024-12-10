import { colors } from "@/styles/colors";
import { categoriesIcons } from "@/utils/categories-icons";
import { Pressable, PressableProps, Text } from "react-native";
import { styled } from "./styles";

interface CategoyProps extends PressableProps {
  name: string;
  iconId: string;
  isSelected?: boolean;
}

export function Category({
  iconId,
  name,
  isSelected = false,
  ...rest
}: CategoyProps) {
  const Icon = categoriesIcons[iconId];

  return (
    <Pressable
      {...rest}
      style={[styled.container, isSelected && styled.containerSelected]}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text style={[styled.name, isSelected && styled.nameSelected]}>
        {name}
      </Text>
    </Pressable>
  );
}
