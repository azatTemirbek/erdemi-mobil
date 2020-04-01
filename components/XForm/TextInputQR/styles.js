import { StyleSheet } from "react-native";
import { BaseColor } from "../../../config";

export default StyleSheet.create({
  containerStyle: {
    paddingTop: 0,
    paddingBottom: 0
  },
  contentStyle: {
    paddingHorizontal: 0,
    width: "100%"
  },
  fullSize: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: BaseColor.blackColor
  },
  topfullSize: {
    backgroundColor: BaseColor.blackColor,
    width: "100%",
    height: "100%"
  },
  close: {
    // backgroundColor: "red",
    alignItems: "center",
    maxWidth: 50,
    maxHeight: 50,
    margin: 10,
    padding: 5,
    position: "absolute",
    right: 0,
    top: 20,
    zIndex: 11
  }
});
