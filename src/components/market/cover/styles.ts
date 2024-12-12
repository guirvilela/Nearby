import { colors } from "@/styles/theme";
import { Platform, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const styled = StyleSheet.create({
  container: {
    width: "100%",
    height: 232,
    backgroundColor: colors.gray[200],
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === "ios" ? getStatusBarHeight() + 16 : 24,
  },
});
