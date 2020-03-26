import { StyleSheet } from "react-native";
import { BaseColor } from "../../config";
export default StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.dividerColor
  },
  title: {
    flex:1,
    padding:10,
  }
});
