import { StyleSheet } from "react-native";
import { generateColors } from "../../config";
import { elevationShadowStyle } from "../../utils";
export default StyleSheet.create({
  container: {
    ...elevationShadowStyle(4),
    borderRadius: 10,
    borderWidth: 0.02,
    borderColor: "transparent",
    padding: 20,
    marginVertical: 10
  },
  ...generateColors()
});
