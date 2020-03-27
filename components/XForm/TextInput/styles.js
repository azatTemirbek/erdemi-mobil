import { StyleSheet } from "react-native";
import { BaseColor } from "../../../config";

export default StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    // paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  labelStyle: {
    padding: 5
  },
  renderRightStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    minWidth: "10%"
  },
  renderLeftStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: "10%"
  },
  baseInput: {
    height: 46,
    // backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    color: "#333333",
    padding: 10,
    width: "100%",
    justifyContent: "center",
    width: "100%",
    minHeight: 35
  },
  errorStyle: { color: "red", padding: 5 }
});
