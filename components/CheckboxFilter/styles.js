import {StyleSheet} from "react-native";
import {BaseColor} from "../../config";

export default StyleSheet.create({
  optionItem: {
    paddingVertical: 15,
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.textSecondaryColor,
    justifyContent: "space-between"
  }
});
