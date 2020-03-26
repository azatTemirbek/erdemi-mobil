import { StyleSheet } from "react-native";
import { BaseColor, Typography, FontWeight, generateColors } from "../../config";

export default StyleSheet.create({
  default: {
    height: 56,
    borderRadius: 8,
    backgroundColor: BaseColor.primaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  textDefault: {
    ...Typography.headline,
    color: BaseColor.whiteColor,
    fontWeight: FontWeight.bold
  },
  outline: {
    backgroundColor: BaseColor.whiteColor,
    borderWidth: 1,
    borderColor: BaseColor.primaryColor
  },
  textOuline: {
    color: BaseColor.primaryColor
  },
  full: {
    width: "100%",
    alignSelf: "auto"
  },
  round: {
    borderRadius: 28
  },
  shadow: {
    shadowColor: BaseColor.blackColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  ...generateColors()
});
