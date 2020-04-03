import { StyleSheet } from "react-native";
import { BaseColor } from "../../../config";

export default StyleSheet.create({
  ItemContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems:"center",
    width:"50%",
    paddingHorizontal: 10
  },
  ItemsConatiner: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  unchecked: {
    height: 26,
    width: 26,
    borderRadius: 13,
    borderColor: "#707070",
    borderWidth: 1
  },
  checked: {
    height: 26,
    width: 26,
    borderRadius: 13,
    borderColor: BaseColor.primaryColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  checkedContent: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: BaseColor.primaryColor
  }
});
