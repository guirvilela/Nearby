import { StyleSheet } from "react-native";

export const styled = StyleSheet.create({
  skeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,

    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 8,
  },
  skeletonImage: {
    width: 116,
    height: 104,
    borderRadius: 8,

    backgroundColor: "#e0e0e0",
    marginRight: 16,
  },
  skeletonTextContainer: {
    flex: 1,
  },
  skeletonText: {
    width: "80%",
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonTextSmall: {
    width: "60%",
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
});
