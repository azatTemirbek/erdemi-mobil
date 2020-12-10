import { StyleSheet } from "react-native";
import { BaseColor } from "../../../config";


export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  baseInput: {
    borderRadius: 5,
    color: "#333333",
    paddingHorizontal: 10,
    minHeight: 48
  },
  disabledInput: {
    backgroundColor: BaseColor.fieldColor
  }
});
