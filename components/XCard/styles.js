import { StyleSheet } from "react-native";
import { BaseColor, BaseStyle, generateColors } from "../../config";

export default StyleSheet.create({
  container: {
    ...BaseStyle.shadow,
    borderRadius: 10,
    borderWidth: 0.02,
    borderColor: "transparent",
    padding: 20,
    marginVertical: 10
  },
  ...generateColors()
});
